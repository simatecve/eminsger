DROP POLICY IF EXISTS cms_admin_all ON cms_content_blocks;
CREATE POLICY cms_admin_all ON cms_content_blocks
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users u
      WHERE u.id = auth.uid()
        AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM auth.users u
      WHERE u.id = auth.uid()
        AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
    )
  );

DROP POLICY IF EXISTS admin_cms_assets_insert ON storage.objects;
CREATE POLICY admin_cms_assets_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    (bucket = 'cms-assets') AND (
      EXISTS (
        SELECT 1
        FROM auth.users u
        WHERE u.id = auth.uid()
          AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
      )
    )
  );

DROP POLICY IF EXISTS admin_cms_assets_update ON storage.objects;
CREATE POLICY admin_cms_assets_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    (bucket = 'cms-assets') AND (
      EXISTS (
        SELECT 1
        FROM auth.users u
        WHERE u.id = auth.uid()
          AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
      )
    )
  )
  WITH CHECK (
    (bucket = 'cms-assets') AND (
      EXISTS (
        SELECT 1
        FROM auth.users u
        WHERE u.id = auth.uid()
          AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
      )
    )
  );

DROP POLICY IF EXISTS admin_cms_assets_delete ON storage.objects;
CREATE POLICY admin_cms_assets_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    (bucket = 'cms-assets') AND (
      EXISTS (
        SELECT 1
        FROM auth.users u
        WHERE u.id = auth.uid()
          AND u.email = ANY (ARRAY['admin@emin.com'::text, 'joeldavidar@gmail.com'::text])
      )
    )
  );
