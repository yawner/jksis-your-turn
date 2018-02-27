import $ from "properjs-hobo";

let $_applyBtn = null;
let $_form = null;
let $_hashParams = null;
let $_interest = null;
let $_opts = null;
let $_urlData = null;

/**
 *
 * @public
 * @module interactions
 * @description Hook module for DOM interactions on buttons, charts and forms.
 *
 */
const interactions = {
    /**
     *
     * @public
     * @method init
     * @memberof charts
     * @description Method runs once when window loads.
     *
     */
    init () {
        if ( this.isActive() ) {
            initBtns();
            fillForm();
            formListener();
        }
    },


    /**
     *
     * @public
     * @method isActive
     * @memberof charts
     * @description Method informs of active status.
     * @returns {boolean}
     *
     */
    isActive () {
        return (this.getElements() >= 0);
    },


    /**
     *
     * @public
     * @method getElements
     * @memberof charts
     * @description Method queries DOM for this modules node.
     * @returns {number}
     *
     */
    getElements () {
        $_applyBtn = $("a[href='#apply']");

        return ( $_applyBtn.length );
    }
};


const initBtns = function ( ) {
    /**
     *
     * @private
     * @method applyButton
     * @memberof interactions
     * @description Method adds undergrad & grad buttons to container when apply button is clicked.
     *
     */
    const btnContainer = $("#landing .Index-page-content .sqs-block-button");
    const newBtns = "<div class=\"sqs-block-button-container--left\" data-alignment=\"left\" data-button-size=\"small\">" +
                    "<a href=\"https://www.du.edu/korbel/admission/apply.html\" target=\"_blank\" class=\"sqs-block-button-element--small sqs-block-button-element\" style=\"margin:0 17px 17px 0;\">Graduate</a>" +
                    "<a href=\"https://www.du.edu/admission-aid/undergraduate/index.html\" target=\"_blank\" class=\"sqs-block-button-element--small sqs-block-button-element\" style=\"margin:0 0 17px 0;\">Undergraduate</a>" +
                    "</div>";

    const appendBtns = function ( ) {
        $_applyBtn.remove();
        btnContainer.append(newBtns);
    };

    const applyClick = function ( list, event, fn ) {
        for ( let i = 0, len = list.length; i < len; i++ ) {
            list[ i ].addEventListener(event, fn, false);
        }
        return false;
    };

    applyClick($_applyBtn, "click", appendBtns);

};


/**
 *
 * @private
 * @method urlParams
 * @memberof interactions
 * @description Method gets parameters from url used in prefilling newsletter forms.
 * @returns {variable}
 *
 */
const urlParams = function ( ) {

    $_hashParams = window.location.hash.split("&"); // substr(1) to remove the `#`

    for ( let i = 0, len = $_hashParams.length; i < len; i++ ) {
        $_urlData = $_hashParams[ i ].split("=");
    }

    return $_urlData;

};


/**
 *
 * @private
 * @method fillForm
 * @memberof interactions
 * @description Method prefills select option based on url parameters.
 *
 */
const fillForm = function ( ) {

    //Pull in url parameters
    urlParams();

    $_interest = $_urlData[ 1 ].replace( "+", " " );
    const $_select = $( "." + $_urlData[ 0 ].substr(1) );

    $_select.each( function ( el ) {

        $_opts = el.children;

        //loop through select options and select the one that matches interest
        for ( let j = 0; j < $_opts.length; j++ ) {
            if ( $_opts[ j ].innerText === $_interest ) {
                $_opts[ j ].parentNode.selectedIndex = j;
            }
        }

    });

};


/**
 *
 * @private
 * @method setFormTxt
 * @memberof interactions
 * @description Method uses parameter from url to change label text for interest select field.
 *
 */
const setFormTxt = function ( ) {

    //Pull in url parameters
    urlParams();

    $_form = $("#mc-embedded-subscribe-form");
    $_interest = $_urlData[ 1 ];
    const $_select = $( "." + $_urlData[ 0 ].substr(1) );

    if ( $_interest === "Quantitative" || $_interest === "Qualitative" ) {
        $_select[ 0 ].parentNode.innerHTML = $_select[ 0 ].parentNode.innerHTML.replace("studies", "methods");
    } else if ( $_interest === "Theory" || $_interest === "Practice" ) {
        $_select[ 0 ].parentNode.innerHTML = $_select[ 0 ].parentNode.innerHTML.replace("studies", "");
    } else {
        return;
    }

};


/**
 *
 * @private
 * @method formListener
 * @memberof interactions
 * @description Method listens for changes to select options.
 *
 */
const formListener = function ( ) {

    //Pull in url parameters
    urlParams();
    const $_select = $( "#mc-embedded-subscribe-form .select ." + $_urlData[ 0 ].substr(1) );

    $_select.on( "change", formChange );

};


/**
 *
 * @private
 * @method formChange
 * @memberof interactions
 * @description Method changes select field.
 * @param {e} $e the event
 *
 */
const formChange = function ( $e ) {

    //reset select HTML so it can be changed below
    const $_label = $e.currentTarget.parentNode;
    const $_selectHTML = "I'm interested in&nbsp;<select name=\"mce-group[3845]\" class=\"REQ_CSS mce-IDEAS\" id=\"mce-group[3845]\">" +
                            "<option value=\"\"></option>" +
                            "<option value=\"1\">Quantitative</option>" +
                            "<option value=\"2\">Qualitative</option>" +
                            "<option value=\"4\">Theory</option>" +
                            "<option value=\"8\">Practice</option>" +
                            "<option value=\"16\">International</option>" +
                            "<option value=\"32\">Domestic</option>" +
                         "</select>&nbsp;studies at the Korbel School.";

    $_label.innerHTML = $_selectHTML;

    //store values of selected options for submission later
    $_interest = $e.currentTarget.selectedOptions[ 0 ].innerText;
    const $_origVal = $e.currentTarget.selectedOptions[ 0 ].value;

    if ( $_interest === "Quantitative" || $_interest === "Qualitative" ) {
        $_label.innerHTML = $_label.innerHTML.replace("studies", "methods");
    } else if ( $_interest === "Theory" || $_interest === "Practice" ) {
        $_label.innerHTML = $_label.innerHTML.replace("studies", "");
    }

    //get new (just generated) option HTML
    $_opts = $(".mce-IDEAS option");

    //reset the index to stored select option (from before HTML was changed)
    for ( let j = 0; j < $_opts.length; j++ ) {
        if ( $_opts[ j ].value === $_origVal ) {
            $_opts[ j ].parentNode.selectedIndex = j;
            $_opts[ j ].parentNode.value = $_origVal;
        }
    }

    //rebind the event to the dynamically created select element
    formListener();
};


/******************************************************************************
 * Export
*******************************************************************************/
export default interactions;