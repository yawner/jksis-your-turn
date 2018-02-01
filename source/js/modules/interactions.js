import * as core from "../core";
import $ from "properjs-hobo";

/**
 *
 * @public
 * @module interactions
 * @description Hook module for interactions on buttons, charts and forms.
 *
 */
const interactions = function () {
    /**
	 *
	 * @public
	 * @method applyButton
	 * @memberof fonts
	 * @description Method adds undergrad & grad buttons to container when apply button is clicked.
	 *
	 */
	const applyBtn = $("a[href='#apply']");
	const btnContainer = $("#landing .Index-page-content .sqs-block-button");
	const newBtns = '<div class="sqs-block-button-container--left" data-alignment="left" data-button-size="small">' +
					'<a href="https://www.du.edu/admission-aid/undergraduate/index.html" target="_blank" class="sqs-block-button-element--small sqs-block-button-element" style="margin:0 17px 17px 0;">Undergraduate</a>' +
					'<a href="https://www.du.edu/korbel/admission/apply.html" target="_blank" class="sqs-block-button-element--small sqs-block-button-element" style="margin:0 0 17px 0;">Graduate</a>' +
					'</div>';

	const appendBtns = function ( ) {
		debugger;
		applyBtn.remove();
		btnContainer.append(newBtns);
	};

	const applyClick = function ( list, event, fn ) {
	    for (let i = 0, len = list.length; i < len; i++) {
	        list[ i ].addEventListener(event, fn, false);
	    }
	    return false;
	};

	applyClick(applyBtn, "click", appendBtns);

};

interactions();

/******************************************************************************
 * Export
*******************************************************************************/
export default interactions;