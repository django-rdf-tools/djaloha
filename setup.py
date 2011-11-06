#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    from setuptools import setup, find_packages
except ImportError:
    import ez_setup
    ez_setup.use_setuptools()
    from setuptools import setup, find_packages

VERSION = __import__('djaloha').__version__

import os
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name='Djaloha',
    version = VERSION,
    description='Django integration for aloha HTML5 editor',
    packages=['djaloha','djaloha.templatetags'],
    include_package_data=True,
    author='Luc Jean',
    author_email='ljean@apidev.fr',
    license='BSD',
    #long_description=read('README.txt'),
    #download_url = "https://github.com/quinode/djaloha/tarball/%s" % (VERSION),
    #download_url='git://github.com/quinode/djaloha.git',
    zip_safe=False,
    install_requires = ['django-floppyforms==0.4.7',]
)

