CREATE TABLE IF NOT EXISTS cms_content_blocks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL,
  item_key text NOT NULL,
  label text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  is_hidden boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, item_key)
);

ALTER TABLE cms_content_blocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS cms_public_read ON cms_content_blocks;
CREATE POLICY cms_public_read ON cms_content_blocks
  FOR SELECT USING (true);

DROP POLICY IF EXISTS cms_admin_all ON cms_content_blocks;
CREATE POLICY cms_admin_all ON cms_content_blocks
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'))
  WITH CHECK (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'));

DROP POLICY IF EXISTS admin_cms_assets_insert ON storage.objects;
CREATE POLICY admin_cms_assets_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    (bucket = 'cms-assets') AND (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'))
  );

DROP POLICY IF EXISTS admin_cms_assets_update ON storage.objects;
CREATE POLICY admin_cms_assets_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    (bucket = 'cms-assets') AND (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'))
  )
  WITH CHECK (
    (bucket = 'cms-assets') AND (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'))
  );

DROP POLICY IF EXISTS admin_cms_assets_delete ON storage.objects;
CREATE POLICY admin_cms_assets_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    (bucket = 'cms-assets') AND (EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.email = 'admin@emin.com'))
  );
