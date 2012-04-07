{% load i18n djaloha_utils %}

$(function(){
    // Aloha configuration
    GENTICS.Aloha.settings = {
        logLevels: {'error': true, 'warn': true, 'info': true, 'debug': false},
        errorhandling : true,
        ribbon: false,
        "i18n": {
            "current": "{%if LANGUAGE_CODE|length > 2%}{{LANGUAGE_CODE|slice:':2'}}{%else%}{{LANGAGE_CODE}}{%endif%}"
        },
        "repositories": {
            "com.gentics.aloha.repositories.LinkList": {
                data: [
                {% for link in links %}{ name: "{{link.title|convert_crlf}}", url: '{{link.get_absolute_url}}', type: 'page', weight: 0.5 }{%if not forloop.last %},{%endif%}
                {% endfor %}
                ]
            }
        },
        "plugins": {
            "com.gentics.aloha.plugins.Format": {
                // all elements with no specific configuration get this configuration
                config : [ 'b', 'i','sub','sup', 'p', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat'],
                editables : {
                    // no formatting allowed for title
                    '#title': [ ], 
                }
            },
            "com.gentics.aloha.plugins.List": { 
                // all elements with no specific configuration get an UL, just for fun :)
                config : [ 'ul' , 'ol'],
                editables : {
                    // Even if this is configured it is not set because OL and UL are not allowed in H1.
                    '#title'	: [  ], 
                }
            },
            "com.gentics.aloha.plugins.Link": {
                // all elements with no specific configuration may insert links
                config : [ 'a' ],
                editables : {
                    // No links in the title.
                    '#title'	: [  ]
                },
                // all links that match the targetregex will get set the target
                // e.g. ^(?!.*aloha-editor.com).* matches all href except aloha-editor.com
                targetregex : '^(http).*',
                // this target is set when either targetregex matches or not set
                // e.g. _blank opens all links in new window
                target : '_blank',
                // the same for css class as for target
                cssclassregex : '^ZZZ',
                cssclass : '',
                // use all resources of type website for autosuggest
                objectTypeFilter: ['website', 'page'],
                // handle change of href
                onHrefChange: function( obj, href, item ) {
                    if ( item ) {
                        jQuery(obj).attr('data-name', item.name);
                    } else {
                        jQuery(obj).removeAttr('data-name');
                    }
                },
            },
            "com.gentics.aloha.plugins.Table": { 
                // all elements with no specific configuration are not allowed to insert tables
                config : [ 'table' ]
            }
        }
    };

    // Make fragments editable
    $('.djaloha-editable').aloha();
    
    GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, "editableDeactivated",
        //Callback called when the fragment edition is done -> Push to the page
        function(event, eventProperties) {
            var ed = eventProperties.editable;
            $("#"+ed.getId()+"_hidden").val($.trim(ed.getContents()));
        }
    );
    
    var resize_thumbnail = function (the_obj) {

        $(".djaloha-editable img.djaloha-thumbnail").each(function(index) {
            $(this).removeClass("djaloha-thumbnail");
            $(this).attr("src", $(this).attr("rel"));
            $(this).removeAttr('rel');
        });

        $(".djaloha-editable a.djaloha-document").each(function(index) {

            var copy = $(this).clone();
            var img = copy.find("img");
            icon_url = img.attr('rel');
            doc_url = copy.attr('rel');
            doc_title = copy.attr('title');

            img.wrap('<div class="docdl_wrapper" />');
            img.attr('src', icon_url).removeClass('cms_doc_bloc');
            img.removeAttr('rel');

            var newdiv = copy.find("div.docdl_wrapper");
            newdiv.append('<a target="_blank" class="docdl_link" href="'+doc_url+'">'+doc_title+'</a>');

            copy.find("span.cms_doc_title").remove();
            newdiv.unwrap();
            newdiv.insertAfter($(this));
            $(this).remove();

        });

        //force the focus in order to make sure that the editable is activated
        //this will cause the deactivated event to be triggered, and the content to be saved
        the_obj.focus(); 
    }
    
    //resize image when dropped in the editor
    GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'editableCreated', function(event, editable) {
        var the_obj = editable.obj;
        jQuery(editable.obj).bind('drop', function(event){
            setTimeout(function() {
                    resize_thumbnail(the_obj);
            }, 0);
        });
    });
});
