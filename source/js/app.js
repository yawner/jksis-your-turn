/**
 *
 * Require for Webpack File Loader.
 * File Loader is a way to compile your Sass with Webpack.
 * This is simply a link to your Sass entry point.
 * This is removed from your final JavaScript build.
 *
 */
require( "../sass/app.scss" );



import * as core from "./core";
import * as sqs from "./sqs";
import fonts from "./modules/fonts";
import chart from "./modules/chart";
import interactions from "./modules/interactions";
import example from "./modules/example";


/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle everything.
 *
 */
class App {
    constructor () {
        this.core = core;
        this.sqs = sqs;
        this.chart = chart;
        this.fonts = fonts;
        this.interactions = interactions;
        this.example = example;

        this.initModules();
    }


    /**
     *
     * @public
     * @instance
     * @method initModules
     * @memberof App
     * @description Initialize application modules.
     *
     */
    initModules () {
        this.chart.init( this );
        this.example.init( this );
        this.fonts.init( this );
        this.interactions.init( this );
    }
}



/******************************************************************************
 * Expose
*******************************************************************************/
window.app = new App();


/******************************************************************************
 * Export
*******************************************************************************/
export default window.app;