# -*- coding: utf-8 -*-

from floppyforms.widgets import TextInput
from django.utils.encoding import force_unicode
from django.forms import Media
from django.core.urlresolvers import reverse

class AlohaInput(TextInput):
    """
    Text widget with aloha html editor
    requires floppyforms to be installed
    """

    template_name='djaloha/alohainput.html'

    def __init__(self, *args, **kwargs):
        self._text_color_plugin = kwargs.pop('text_color_plugin', True)
        super(AlohaInput, self).__init__(*args, **kwargs)

    def _get_media(self):
        """
        return code for inserting required js and css files
        need aloha , plugins and initialization
        include the 3rd party ImagePlugin from tapo: make possible to drag-and-drop and edit images
        """

        css = {
            'all': (
                "aloha.0.20/css/aloha.css",
            )
        }

        js = (
            "js/jquery.1.7.1.min.js",
            # Yes I know this is very dirty but the only solution so-far
            'aloha.0.20/lib/aloha.js" data-aloha-plugins="common/format,common/highlighteditables,common/list,common/link,common/undo,common/paste,common/block',
        )

        js = js + (reverse('aloha_init'),)

        return Media(css=css, js=js)

    media = property(_get_media)
