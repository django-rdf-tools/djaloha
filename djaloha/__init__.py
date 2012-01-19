# -*- coding: utf-8 -*-

VERSION = (0, 3)

def get_version():
    version = '%s.%s' % (VERSION[0], VERSION[1])
    return version

__version__ = get_version()
