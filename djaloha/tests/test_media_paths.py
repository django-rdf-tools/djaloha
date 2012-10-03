
from unittest import TestCase
import re
from djaloha.widgets import AlohaInput
from django.conf import settings

SRC_MATCH = re.compile(r'src="/static/(.*)/lib/aloha\.js"')


class MediaPathTestCase(TestCase):

    def test_aloha_css_path_must_include_aloha_version_number(self):

        widget = AlohaInput()
        aloha_version = settings.DJALOHA_ALOHA_VERSION
        src_found = False
        for js_tags in widget.media.render_js():
            matched_src = SRC_MATCH.search(js_tags)
            if matched_src:
                self.assertEquals(aloha_version, matched_src.groups(1)[0])
                src_found = True
                break
        self.assertTrue(src_found, "A path to the Aloha javascript file wasn't found.")
