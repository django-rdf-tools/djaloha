# -*- coding:utf-8 -*-
from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
    url(r'^djaloha/aloha-config.js', 'djaloha.views.aloha_init', name='aloha_init'),
)
