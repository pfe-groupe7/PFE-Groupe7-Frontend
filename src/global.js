(function ($) {
    'use strict';
    try {
        var $validator = $("#js-wizard-form").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true,
                    minlength: 3
                },
                password: {
                    required: true,
                    minlength: 8
                },
                re_password: {
                    required: true,
                    minlength: 8,
                    equalTo: '#password'
                }
            },
            messages: {
                username: {
                    required: "Entrez votre nom et prénom"
                },
    
                email: {
                    required: "Entrez votre adresse mail",
    
                },
                password: {
                    required: "Entrez votre mot de passe",
                    minlength: "Le mot de passe doit contenir au moins 8 caractères"
                },
                re_password: {
                    required: "Confirmez votre mot de passe",
                    minlength: "Le mot de passe doit contenir au moins 8 caractères",
                    equalTo: "Le mot de passe ne correspond pas"
                }
            }
        });
    
        $("#js-wizard-form").bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn--next',
            'onNext': function(tab, navigation, index) {
                var $valid = $("#js-wizard-form").valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },
            'onTabClick': function (tab, navigation, index) {
                var $valid = $("#js-wizard-form").valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            }
    
        });
    
    }
    catch (e) {
        console.log(e)
    }

})(jQuery);