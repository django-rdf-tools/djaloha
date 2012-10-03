
from unittest import TestCase
import re
from djaloha.widgets import AlohaInput
from django.conf import settings

ALOHA_SRC_MATCH = re.compile(r'(src|href)="/static/(.*)/(lib|css)/aloha\.(js|css)"')


class MediaPathTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.widget = AlohaInput()

    def tearDown(self):
        try:
            del settings.DJALOHA_ALOHA_VERSION
        except AttributeError:
            pass

    def test_aloha_js_path_must_include_aloha_version_number_from_settings(self):
        aloha_version = 'aloha.0.22.1'
        settings.DJALOHA_ALOHA_VERSION = aloha_version
        src_found = False
        for tags in self.widget.media.render_js():
            matched_src = ALOHA_SRC_MATCH.search(tags)
            if matched_src:
                self.assertEquals(aloha_version, matched_src.groups()[1])
                src_found = True
                break
        self.assertTrue(src_found, "A path to the Aloha javascript file wasn't found.")

    def test_aloha_css_path_must_include_aloha_version_number_from_settings(self):
        aloha_version = 'aloha.0.22.1'
        settings.DJALOHA_ALOHA_VERSION = aloha_version
        src_found = False
        for tags in self.widget.media.render_css():
            matched_src = ALOHA_SRC_MATCH.search(tags)
            if matched_src:
                self.assertEquals(aloha_version, matched_src.groups()[1])
                src_found = True
                break
        self.assertTrue(src_found, "A path to the Aloha javascript file wasn't found.")

    def test_default_css_path_must_be_use_aloha_0_20_20_version(self):
        aloha_version = 'aloha.0.20.20'
        src_found = False
        for tags in self.widget.media.render_css():
            matched_src = ALOHA_SRC_MATCH.search(tags)
            if matched_src:
                self.assertEquals(aloha_version, matched_src.groups()[1])
                src_found = True
                break
        self.assertTrue(src_found, "A path to the Aloha javascript file wasn't found.")

    def test_default_js_path_must_be_use_aloha_0_20_20_version(self):
        aloha_version = 'aloha.0.20.20'
        src_found = False
        for tags in self.widget.media.render_js():
            matched_src = ALOHA_SRC_MATCH.search(tags)
            if matched_src:
                self.assertEquals(aloha_version, matched_src.groups()[1])
                src_found = True
                break
        self.assertTrue(src_found, "A path to the Aloha javascript file wasn't found.")
