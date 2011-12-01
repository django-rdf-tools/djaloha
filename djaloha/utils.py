# -*- coding: utf-8 -*-
from djaloha.forms import DjaloahForm
from django.db.models import get_model

def extract_forms_args(data):
    forms_args = []
    for field in data:
        if field.find('djaloha') == 0:
            args = field.split("__")
            if len(args) > 4:
                app_name = args[1]
                model_name = args[2]
                model_class = get_model(app_name, model_name)
                field_name = args[-1]
                lookup = {}
                for (k, v) in zip(args[3:-1:2], args[4:-1:2]):
                    lookup[k] = v
                forms_args.append((model_class, lookup, field_name))
    return forms_args

def make_forms(forms_args, data):
    forms = []
    for (model_class, lookup, field_name) in forms_args:
        forms.append(DjaloahForm(model_class, lookup, field_name, data=data))
    return forms
    
    
    