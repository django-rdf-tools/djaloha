{% load i18n djaloha_utils %}

(function (window, undefined) {
	var Aloha = window.Aloha || ( window.Aloha = {} );
	
	Aloha.settings = {
		logLevels: { 'error': true, 'warn': true, 'info': true, 'debug': false, 'deprecated': true },
		errorhandling: false,
		ribbon: false,
		locale: "{%if LANGUAGE_CODE|length > 2%}{{LANGUAGE_CODE|slice:':2'}}{%else%}{{LANGAGE_CODE}}{%endif%}",
		floatingmenu: {
			"behaviour" : "float"
		},
        repositories: {
            linklist: {
		    	data: [{% for link in links %}
                    { name: "{{link.title|convert_crlf}}", url: '{{link.get_absolute_url}}', type: 'website', weight: 0.50 }{%if not forloop.last %},{%endif%}
                {% endfor %}]
			}
		},
		plugins: {
			format: {
				// all elements with no specific configuration get this configuration
				config: [  'b', 'i', 'u', 'del', 'p', 'sub', 'sup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'removeFormat' ],
                editables: {
					// no formatting allowed for title
					'#top-text': []
				}
			},
			list: {
				// all elements with no specific configuration get an UL, just for fun :)
				config: [ 'ul', 'ol' ],
				editables: {
					// Even if this is configured it is not set because OL and UL are not allowed in H1.
					'#top-text': []
				}
			},
			listenforcer: {
				editables: [ '.aloha-enforce-lists' ]
			},
			abbr: {
				// all elements with no specific configuration get an UL, just for fun :)
				config: [ 'abbr' ],
				editables: {
					// Even if this is configured it is not set because OL and UL are not allowed in H1.
					'#top-text': []
				}
			},
			link: {
				// all elements with no specific configuration may insert links
				config: [ 'a' ],
				editables: {
					// No links in the title.
					'#top-text': []
				},
				// all links that match the targetregex will get set the target
                // e.g. ^(?!.*aloha-editor.com).* matches all href except aloha-editor.com
				targetregex : '^http.*',
				// this target is set when either targetregex matches or not set
				// e.g. _blank opens all links in new window
				target: '_blank',
				// the same for css class as for target
				//cssclassregex: '^(?!.*aloha-editor.com).*',
				//cssclass: 'djaloha-editable',
				// use all resources of type website for autosuggest
				objectTypeFilter: ['page', 'website']
				/* handle change of href
				onHrefChange: function ( obj, href, item ) {
					var jQuery = Aloha.require( 'aloha/jquery' );
					if ( item ) {
						jQuery( obj ).attr( 'data-name', item.name );
					} else {
						jQuery( obj ).removeAttr( 'data-name' );
					}
				}*/
			},
			table: {
				// all elements with no specific configuration are not allowed to insert tables
				config: [ 'table' ],
				editables: {
					// Don't allow tables in top-text
					'#top-text': [ '' ]
				},
				summaryinsidebar: true,
					// [{name:'green', text:'Green', tooltip:'Green is cool', iconClass:'GENTICS_table GENTICS_button_green', cssClass:'green'}]
				tableConfig: [
					{ name: 'hor-minimalist-a' },
					{ name: 'box-table-a' },
					{ name: 'hor-zebra' },
				],
				columnConfig: [
					{ name: 'table-style-bigbold',  iconClass: 'aloha-button-col-bigbold' },
					{ name: 'table-style-redwhite', iconClass: 'aloha-button-col-redwhite' }
				],
				rowConfig: [
					{ name: 'table-style-bigbold',  iconClass: 'aloha-button-row-bigbold' },
					{ name: 'table-style-redwhite', iconClass: 'aloha-button-row-redwhite' }
				]
			},
            image: {
				config:{
					'fixedAspectRatio' : false,
					'maxWidth'         : 600,
					'minWidth'         : 20,
					'maxHeight'        : 600,
					'minHeight'        : 20,
					'globalselector'   : '.global',
					'ui': {
						'oneTab': true
					}
				},
				'fixedAspectRatio' : false,
				'maxWidth'         : 600,
				'minWidth'         : 20,
				'maxHeight'        : 600,
				'minHeight'        : 20,
				'globalselector'   : '.global',
				'ui': {
					'oneTab' : true,
					'align'  : false,
					'margin' : false
				}
			},
			cite: {
				referenceContainer: '#references'
			},
			formatlesspaste :{
				formatlessPasteOption : true,
				strippedElements : [
				"em",
				"strong",
				"small",
				"s",
				"cite",
				"q",
				"dfn",
				"abbr",
				"time",
				"code",
				"var",
				"samp",
				"kbd",
				"sub",
				"sup",
				"i",
				"b",
				"u",
				"mark",
				"ruby",
				"rt",
				"rp",
				"bdi",
				"bdo",
				"ins",
				"del"]
			}
			,
			'numerated-headers': {
				numeratedactive: false
			}
		}
	};
    
    Aloha.ready( function() {
        // Make #content editable once Aloha is loaded and ready.
        Aloha.jQuery('.djaloha-editable').aloha();
         
    });
    
    Aloha.bind('aloha-editable-deactivated', function(event, eventProperties){
        //Callback called when the fragment edition is done -> Push to the page
        var ed = eventProperties.editable;
        $("#"+ed.getId()+"_hidden").val($.trim(ed.getContents()));
    });
    
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
    //GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'editableCreated', function(event, editable) {
    Aloha.bind('aloha-editable-created', function(event, editable){
        var the_obj = editable.obj;
        jQuery(editable.obj).bind('drop', function(event){
            setTimeout(function() {
                    resize_thumbnail(the_obj);
            }, 0);
        });
    });
    
})(window);

