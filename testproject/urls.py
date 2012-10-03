# -*- coding: utf-8 -*-
from django.conf.urls import *


urlpatterns = patterns('',
    url('^', include('djaloha.urls')),
)
