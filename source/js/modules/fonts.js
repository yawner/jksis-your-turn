import * as core from "../core";

/**
 *
 * @public
 * @module fonts
 * @description Hook module for making cosmetic fixes to DOM after Typekit fonts load.
 *
 */
const fonts = function () {
    /**
	 *
	 * @public
	 * @method paintFonts
	 * @memberof fonts
	 * @description Method queries DOM for active fonts class from Typekit then adds italic & bold classes.
	 *
	 */
	const $_wfActive = core.dom.html.find(".wf-active");
	const $em = document.querySelectorAll("em");
	const $strong = document.querySelectorAll("strong");

	if ( $_wfActive !== null ) {
		Array.prototype.forEach.call($em, function (el, i) {
			const className = "-em";

			if (el.classList)
			  el.classList.add(className);
			else
			  el.className += " " + className;
		});
		Array.prototype.forEach.call($strong, function (el, i) {
			const className = "-strong";

			if (el.classList)
			  el.classList.add(className);
			else
			  el.className += " " + className;
		});
	}


};

fonts();

/******************************************************************************
 * Export
*******************************************************************************/
export default fonts;