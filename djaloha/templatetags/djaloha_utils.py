# -*- coding: utf-8 -*-

from django import template
register = template.Library()
from django.db.models import get_model
from djaloha.forms import DjaloahForm

@register.filter
def convert_crlf(value):
   """
   Replace carriage return and line feed character by their javascript value
   Make possible to include title with those characters in the aloha links
   """
   return value.replace('\r', '\\r').replace('\n', '\\n')
   
@register.filter
def remove_br(value):
   """
   Remove the <br> tag by spaces except at the end
   Used for providing title without this tag 
   """
   return value.replace('<br>', ' ').strip()

class DjalohaEditNode(template.Node):
    
    def __init__(self, model_class, lookup, field_name):
        super(DjalohaEditNode, self).__init__()
        self._model_class = model_class
        self._lookup = lookup
        self._field_name = field_name
    
    def render(self, context):
        #resolve context. keep string values as is
        for (k, v) in self._lookup.items():
            new_v = v.strip('"').strip("'")
            if len(v)-2 == len(new_v):
                self._lookup[k] = new_v
            else:
                self._lookup[k] = context[v]
        
        #get or create the object to edit
        self._object, _is_new = self._model_class.objects.get_or_create(**self._lookup)
        value = getattr(self._object, self._field_name)
        
        #if edit mode : activate aloha form
        if context.get('djaloah_edit'):
            form = DjaloahForm(self._model_class, self._lookup, self._field_name, field_value=value)
            return form.as_is()
        else:
            return value
            
def get_djaloha_edit_args(parser, token):
    full_model_name = token.split_contents()[1]
    lookups = token.split_contents()[2].split(';')
    field_name = token.split_contents()[3]

    app_name, model_name = full_model_name.split('.')
    model_class = get_model(app_name, model_name)

    lookup = {}
    for l in lookups:
        try:
            k, v = l.split('=')
        except ValueError:
            raise template.TemplateSyntaxError(
                u"djaloha_edit {0} is an invalid lookup. It should be key=value".format(l))
        lookup[k] = v
    
    if not lookup:
        raise template.TemplateSyntaxError(u"The djaloha_edit templatetag requires at least one lookup")
    return model_class, lookup, field_name

#@register.tag
#def djaloha_edit(parser, token):
#    model_class, lookup, field_name = get_djaloha_edit_args(parser, token)
#    return DjalohaEditNode(model_class, lookup, field_name)
