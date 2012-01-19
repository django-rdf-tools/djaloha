djaloha
===============================================

* `What is djaloha good for?`_
* `Quick start`_

.. _What is djaloha good for?: #good-for
.. _Quick start?: #quick-start

.. _good-for:

What is djaloha good for?
------------------------------------
djaloha (django + aloha) is a wrapper around the `Aloha Editor <http://aloha-editor.org/>`_ that enables inline editing for your HTML content.
It includes a django Form and a Widget helper.

.. _quick-start:

Quick start
------------------------------------
In settings.py, add 'djaloha' (with an underscore) to the INSTALLED_APPS 
Under Django 1.3, the static folder should be found automatically, as the templates folder.
In urls.py add (r'^djaloha/', include('djaloha.urls')) to your urlpatterns

Djaloha has a "provider" that allows you to add local links to your models (articles, contacts, whatever) easily, through an autocomplete field that will search for objects based on rules you defined for each model :

* search this kind of models using get_absolute_url()
* search this kind of models using another method
* search this kind of models using a specified model field

You can set the ``DJALOHA_LINK_MODELS`` setting in your settings.py to tell which django models will be available in the auto-complete field of the "add link" widget like this :

DJALOHA_LINK_MODELS = ('coop_local.Article','calendar.Event')

(to be continued)


License
=======

djaloha uses the same license as Django (BSD).
djaloha development was funded by `CREDIS <http://credis.org/>`_, FSE (European Social Fund) and Conseil Régional d'Auvergne.
