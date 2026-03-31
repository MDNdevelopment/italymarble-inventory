-- Create slabs table
CREATE TABLE slabs (
  id               SERIAL PRIMARY KEY,
  product_code     TEXT NOT NULL,
  material_index   TEXT NOT NULL,
  surface_index    TEXT NOT NULL,
  thickness        INTEGER NOT NULL DEFAULT 20,
  ind_tag           TEXT NOT NULL,
  lot_no           TEXT NOT NULL,
  quality          TEXT NOT NULL,
  location         TEXT NOT NULL,
  bin_location     TEXT NOT NULL,
  length           INTEGER NOT NULL,
  width            INTEGER NOT NULL,
  length_net       INTEGER NOT NULL,
  width_net        INTEGER NOT NULL,
  quantity         INTEGER NOT NULL DEFAULT 1,
  unit             TEXT NOT NULL DEFAULT 'sqm',
  inspection       BOOLEAN NOT NULL DEFAULT true,
  inactive         BOOLEAN NOT NULL DEFAULT false,
  picture_ref      TEXT NOT NULL DEFAULT '',
  picture_s_ref    TEXT NOT NULL DEFAULT '',
  bookmatch        TEXT NOT NULL DEFAULT 'No',
  value            NUMERIC(10,2) NOT NULL,
  surface_area     NUMERIC(10,2) NOT NULL,
  contour_file     TEXT NOT NULL DEFAULT ''
);

-- Enable RLS
ALTER TABLE slabs ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public can read slabs"
  ON slabs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed data (12 mock slabs)
INSERT INTO slabs (id, product_code, material_index, surface_index, thickness, ind_tag, lot_no, quality, location, bin_location, length, width, length_net, width_net, quantity, unit, inspection, inactive, picture_ref, picture_s_ref, bookmatch, value, surface_area, contour_file) VALUES
(1,  'MRB-CAL-001', 'Marble',    'Polished', 20, 'White', 'L2024-01', 'Premium',  'Warehouse A', 'A-01', 280, 160, 275, 155, 2, 'sqm', true,  false, 'https://plus.unsplash.com/premium_photo-1700866212043-9cbf5034fb13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'https://plus.unsplash.com/premium_photo-1700866212043-9cbf5034fb13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%', 'Yes', 450.00, 4.26, ''),
(2,  'QTZ-SLV-001', 'Quartzite', 'Honed',    20, 'Gray',  'L2024-02', 'Premium',  'Warehouse A', 'A-04', 260, 150, 255, 145, 4, 'sqm', true,  false, 'https://images.unsplash.com/photo-1550053808-52a75a05955d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'https://images.unsplash.com/photo-1550053808-52a75a05955d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'No',  280.00, 3.90, ''),
(3,  'GRN-BLK-001', 'Granite',   'Polished', 20, 'Black', 'L2024-03', 'Standard', 'Warehouse B', 'B-02', 300, 165, 295, 160, 6, 'sqm', true,  false, 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'No',  180.00, 4.95, ''),
(4,  'QTZ-TAJ-001', 'Quartzite', 'Polished', 20, 'White', 'L2024-04', 'Premium',  'Warehouse A', 'A-07', 275, 155, 270, 150, 3, 'sqm', true,  false, 'https://plus.unsplash.com/premium_photo-1672735005959-e0a46dc39f74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'https://plus.unsplash.com/premium_photo-1672735005959-e0a46dc39f74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3Jhbml0ZXxlbnwwfHwwfHx8MA%3D%3D', 'Yes', 320.00, 4.26, ''),
(5,  'GRN-BLU-001', 'Granite',   'Polished', 30, 'Blue',  'L2024-05', 'Premium',  'Warehouse B', 'B-05', 290, 160, 285, 155, 2, 'sqm', false, false, 'https://images.unsplash.com/photo-1632198761400-00497310f848?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1632198761400-00497310f848?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'No',  220.00, 4.64, ''),
(6,  'MRB-NER-001', 'Marble',    'Polished', 20, 'Black', 'L2024-06', 'Premium',  'Warehouse A', 'A-10', 265, 145, 260, 140, 1, 'sqm', true,  false, 'https://images.unsplash.com/photo-1584403293325-756fc1786516?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1584403293325-756fc1786516?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'Yes', 350.00, 3.84, ''),
(7,  'MRB-GLD-001', 'Marble',    'Polished', 20, 'White', 'L2024-07', 'Premium',  'Warehouse A', 'A-12', 285, 160, 280, 155, 2, 'sqm', true,  false, 'https://images.unsplash.com/photo-1584058878169-03e19f2429ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1584058878169-03e19f2429ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'Yes', 420.00, 4.56, ''),
(8,  'QTZ-FNT-001', 'Quartzite', 'Honed',    20, 'Gray',  'L2024-08', 'Standard', 'Warehouse B', 'B-08', 270, 150, 265, 145, 5, 'sqm', true,  false, 'https://plus.unsplash.com/premium_photo-1675798561940-8cf9cbffc175?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'https://plus.unsplash.com/premium_photo-1675798561940-8cf9cbffc175?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdyYW5pdGV8ZW58MHx8MHx8fDA%3D', 'No',  195.00, 4.05, ''),
(9,  'MRB-VRD-001', 'Marble',    'Polished', 20, 'Green', 'L2024-09', 'Premium',  'Warehouse C', 'C-01', 255, 140, 250, 135, 1, 'sqm', true,  false, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', 'No',  380.00, 3.57, ''),
(10, 'QTZ-AZL-001', 'Quartzite', 'Honed',    30, 'Blue',  'L2024-10', 'Premium',  'Warehouse C', 'C-04', 270, 155, 265, 150, 3, 'sqm', false, false, 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80', 'Yes', 310.00, 4.18, ''),
(11, 'GRN-SAT-001', 'Granite',   'Satin',    20, 'Gray',  'L2024-11', 'Standard', 'Warehouse B', 'B-11', 310, 170, 305, 165, 4, 'sqm', true,  false, 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80', 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=80', 'No',  165.00, 5.27, ''),
(12, 'MRB-SAT-001', 'Marble',    'Satin',    20, 'White', 'L2024-12', 'Premium',  'Warehouse A', 'A-15', 268, 152, 263, 147, 2, 'sqm', true,  false, 'https://images.unsplash.com/photo-1604079628050-08b6e8e32547?w=800&q=80', 'https://images.unsplash.com/photo-1604079628050-08b6e8e32547?w=400&q=80', 'Yes', 395.00, 4.07, '');

-- Reset sequence to avoid conflicts with future inserts
SELECT setval('slabs_id_seq', (SELECT MAX(id) FROM slabs));
