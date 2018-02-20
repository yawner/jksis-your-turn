import * as core from "../core";

let $_wfActive = null;
let $_em = null;
let $_strong = null;

/**
 *
 * @public
 * @module fonts
 * @description Hook module for making cosmetic fixes to font appearances after Typekit fonts load.
 *
 */
const fonts = {
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
            initFonts();
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
        $_wfActive = core.dom.html.find(".wf-active");

        return ( $_wfActive.length );
    }

};

/**
 *
 * @private
 * @method paintFonts
 * @memberof fonts
 * @description Method queries DOM for active fonts class from Typekit then adds italic & bold classes.
 *
 */
const initFonts = function ( ) {
    $_em = core.dom.html.find("em");
    $_strong = core.dom.html.find("strong");

    Array.prototype.forEach.call( $_em, function ( el ) {
        const className = "-em";

        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += " " + className;
        }
    });

    Array.prototype.forEach.call( $_strong, function ( el ) {
        const className = "-strong";

        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += " " + className;
        }
    });

};



/******************************************************************************
 * Export
*******************************************************************************/
export default fonts;