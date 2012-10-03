Djaloha
===============================================
.. image:: https://secure.travis-ci.org/dmpinheiro/djaloha.png?branch=master

* `What is djaloha good for?`_
* `Quick start`_
* `Options`_

.. _What is djaloha good for?: #good-for
.. _Quick start?: #quick-start
.. _Options?: #options

.. _good-for:

What is djaloha good for?
------------------------------------
Djaloha (django + aloha) is a backend for using the `Aloha Editor <http://aloha-editor.org/>`_ into a Django site.
It enables inline editing for your HTML content.
It includes a django Form and a Widget helper.
Djaloha is using aloha.0.20

.. _quick-start:

Quick start
------------------------------------
In settings.py, add 'djaloha' to the INSTALLED_APPS 
Under Django 1.3+, the static folder should be found automatically, as the templates folder.
In urls.py add ``(r'^djaloha/', include('djaloha.urls'))`` to your urlpatterns

Then create a form. For example something like ::

    import floppyforms
    from models import Note
    from djaloha.widgets import AlohaInput
    
    class NoteForm(floppyforms.ModelForm):
        class Meta:
            model = Note
            fields = ('text',)
            widgets = {
                'text': AlohaInput(),
            }


Let's assume that you've a ``form`` variable pointing on an instance of a NoteForm.
In the template file, call the form and don't forget to put ``{{form.media}}`` in the headers.

.. _options:

Options
------------------------------------

Djaloha has a "provider" that allows you to add local links to your models (articles, contacts, whatever) easily, through an autocomplete field that will search for objects based on rules you defined for each model :

* search this kind of models using get_absolute_url()
* search this kind of models using another method
* search this kind of models using a specified model field

You can set the ``DJALOHA_LINK_MODELS`` setting in your settings.py to tell which django models will be available in the auto-complete field of the "add link" widget like this ::

    DJALOHA_LINK_MODELS = ('coop_local.Article','calendar.Event')
    
    
djaloha requires jquery and is provided by default with jquery.1.7.2. You can change the jquery version if needed ::

    DJALOHA_JQUERY = 'js/jquery.1.7.2.js'
    
    
Aloha has a nice plugin architecture. djaloha includes by default the main Aloha plugins. You may want to have a different set of plugins.
Please refer to the Aloha docs for more information on plugins ::

    DJALOHA_PLUGINS = (
        "common/format",
        "common/highlighteditables",
        "common/list",
        "common/link",
        "common/undo",
        "common/paste",
        "common/commands",
        "common/image",
        "common/align",
        "extra/attributes",
        "common/characterpicker",
        "common/abbr",
        "common/horizontalruler",
        "common/table",
        "extra/browser",
    )
    

Please note that the ``DJALOHA_PLUGINS`` setting is a global setting. If you need to change the set of plugins for a specific form field, you
can pass a similar tuple in the ``aloha_plugins`` attribute of your ``AlohaInput`` widget.
The ``extra_aloha_plugins`` attribute will add additional plugins to the default set.

``DJALOHA_INIT_URL`` setting make possible to overloaf the aloha init file of djaloha. ``aloha_init_url`` attribute of ``AlohaInput`` can also be used to overload it for a specific form field.

License
=======

Djaloha uses the same license as Django (BSD).

Djaloha development was funded by `CREDIS <http://credis.org/>`_, FSE (European Social Fund) and Conseil Regional d'Auvergne.
