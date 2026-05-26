CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  year text,
  location text,
  main_image text,
  description text,
  client text,
  duration text,
  scope text[] DEFAULT '{}',
  gallery text[] DEFAULT '{}',
  is_hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access" ON projects
  FOR SELECT USING (is_hidden = false);

CREATE POLICY "Allow admin all access" ON projects
  FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'admin@emin.com');

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_project_images_insert ON storage.objects;
CREATE POLICY admin_project_images_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    (bucket = 'project-images') AND (auth.jwt() ->> 'email' = 'admin@emin.com')
  );

DROP POLICY IF EXISTS admin_project_images_update ON storage.objects;
CREATE POLICY admin_project_images_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    (bucket = 'project-images') AND (auth.jwt() ->> 'email' = 'admin@emin.com')
  )
  WITH CHECK (
    (bucket = 'project-images') AND (auth.jwt() ->> 'email' = 'admin@emin.com')
  );

DROP POLICY IF EXISTS admin_project_images_delete ON storage.objects;
CREATE POLICY admin_project_images_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    (bucket = 'project-images') AND (auth.jwt() ->> 'email' = 'admin@emin.com')
  );
