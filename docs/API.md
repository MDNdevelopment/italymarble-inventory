# Slab Sync API Documentation

## Base URL

```
https://italyinventory.netlify.app
```

---

## POST /api/slabs/sync

Synchronizes the slab database. Supports upserting new or updated slab records and marking slabs as inactive.

### Authorization

All requests must include an API key in the request header.

| Header      | Value              |
|-------------|--------------------|
| `x-api-key` | `<your-api-key>`   |

An incorrect or missing key returns `401 Unauthorized`.

---

### Request Body

**Content-Type:** `application/json`

At least one of `upsert` or `remove` must be present.

```json
{
  "upsert": [ ...SlabRow ],
  "remove": [ "product_code_1", "product_code_2" ]
}
```

| Field    | Type            | Required | Description                                                                 |
|----------|-----------------|----------|-----------------------------------------------------------------------------|
| `upsert` | `SlabRow[]`     | No*      | Array of slab objects to insert or update, matched by `product_code`.       |
| `remove` | `string[]`      | No*      | Array of `product_code` strings. Matching slabs are marked `inactive: true`.|

*At least one of `upsert` or `remove` must be provided.

---

### SlabRow Schema

| Field           | Type      | Required | Description                                      |
|-----------------|-----------|----------|--------------------------------------------------|
| `product_code`  | `string`  | **Yes**  | Unique identifier for the slab. Used as upsert key. |
| `material_index`| `string`  | No       | Material classification index.                   |
| `surface_index` | `string`  | No       | Surface finish classification index.             |
| `thickness`     | `number`  | No       | Thickness of the slab.                           |
| `ind_tag`       | `string`  | No       | Individual tag/label for the slab.               |
| `lot_no`        | `string`  | No       | Lot number.                                      |
| `quality`       | `string`  | No       | Quality grade.                                   |
| `location`      | `string`  | No       | Warehouse or storage location.                   |
| `bin_location`  | `string`  | No       | Specific bin within the location.                |
| `length`        | `number`  | No       | Gross length of the slab.                        |
| `width`         | `number`  | No       | Gross width of the slab.                         |
| `length_net`    | `number`  | No       | Net usable length.                               |
| `width_net`     | `number`  | No       | Net usable width.                                |
| `quantity`      | `number`  | No       | Quantity on hand.                                |
| `unit`          | `string`  | No       | Unit of measure (e.g. `SF`, `M2`).               |
| `inspection`    | `boolean` | No       | Whether the slab is flagged for inspection.      |
| `inactive`      | `boolean` | No       | If `true`, hides the slab from the web inventory. Overridden to `false` on upsert. |
| `picture_ref`   | `string`  | No       | URL or reference to the full-size slab image.    |
| `picture_s_ref` | `string`  | No       | URL or reference to the thumbnail image.         |
| `bookmatch`     | `string`  | No       | Bookmatch group identifier.                      |
| `value`         | `number`  | No       | Monetary value of the slab.                      |
| `surface_area`  | `number`  | No       | Computed surface area.                           |
| `contour_file`  | `string`  | No       | Reference to a contour/shape file.               |

> **Note:** Upserted records always have `inactive` set to `false` regardless of the value passed in the payload.

---

### Responses

#### 200 OK

Sync completed successfully.

```json
{
  "ok": true,
  "summary": {
    "upserted": 5,
    "removed": 2
  }
}
```

| Field               | Type    | Description                                 |
|---------------------|---------|---------------------------------------------|
| `ok`                | `boolean` | Always `true` on success.                 |
| `summary.upserted`  | `number`  | Number of records inserted or updated.    |
| `summary.removed`   | `number`  | Number of records marked inactive.        |

#### 401 Unauthorized

Missing or invalid API key.

```json
{
  "error": "Unauthorized."
}
```

#### 400 Bad Request

Request body is not valid JSON.

```json
{
  "error": "Invalid JSON."
}
```

#### 422 Unprocessable Entity

Request body failed schema validation.

```json
{
  "error": "At least one of 'upsert' or 'remove' must be provided."
}
```

Other possible validation error messages:

- `"'upsert' must be an array."`
- `"upsert[N] is missing a valid product_code."`
- `"'remove' must be an array."`
- `"remove[N] must be a non-empty string."`

#### 500 Internal Server Error

A database operation failed.

```json
{
  "error": "Database operation failed."
}
```

---

### Example Requests

#### Upsert slabs (curl)

```bash
curl -X POST https://italyinventory.netlify.app/api/slabs/sync \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "upsert": [
      {
        "product_code": "MAR-001-A",
        "material_index": "CALACATTA",
        "surface_index": "POLISHED",
        "thickness": 2,
        "lot_no": "L2024-05",
        "quality": "FIRST",
        "location": "WAREHOUSE-A",
        "length": 120,
        "width": 60,
        "length_net": 118,
        "width_net": 58,
        "quantity": 1,
        "unit": "SF",
        "picture_ref": "https://cdn.example.com/slabs/MAR-001-A.jpg",
        "picture_s_ref": "https://cdn.example.com/slabs/MAR-001-A_thumb.jpg",
        "surface_area": 48.33
      }
    ]
  }'
```

#### Remove slabs (curl)

```bash
curl -X POST https://italyinventory.netlify.app/api/slabs/sync \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "remove": ["MAR-001-A", "MAR-002-B"]
  }'
```

#### Upsert and remove in a single request (curl)

```bash
curl -X POST https://italyinventory.netlify.app/api/slabs/sync \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "upsert": [
      {
        "product_code": "GRN-010-C",
        "material_index": "VERDE GUATEMALA",
        "surface_index": "HONED",
        "thickness": 3,
        "quantity": 1,
        "unit": "SF"
      }
    ],
    "remove": ["OLD-SLAB-99"]
  }'
```
