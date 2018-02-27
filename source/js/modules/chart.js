import * as core from "../core";
import Chart from "chart.js";
import "chartjs-plugin-deferred";


let $_chart = null;


/**
 *
 * @public
 * @module charts
 * @description Hook module for constructing interactive chart from Chartjs.
 *
 */
const charts = {
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
            initChart();
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
        return (this.getElements() > 0);
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
        $_chart = core.dom.body.find( "#chart" );

        return ( $_chart.length );
    }

};

/**
 *
 * @private
 * @method initChart
 * @memberof charts
 * @description This module would do something with your elements.
 *
 */
const initChart = function ( ) {

    /* Add Korbel text to center of chart */
    Chart.pluginService.register({
        beforeDraw: function ( chart ) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = "600 " + ( fontSize * 20 ) + "px futura-pt-bold, Futura, sans-serif";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#0048A5";

            var text = "Korbel",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.25;

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    });

    /* Draw chart */
    const ctx = $_chart;
    const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                "Theory",
                "International",
                "Quantitative",
                "Practice",
                "Domestic",
                "Qualitative"
            ],
            datasets: [{
                data: [10, 10, 10, 10, 10, 10],
                backgroundColor: [
                    "#0BB3E4",
                    "#0048A5",
                    "#FDB813",
                    "#00637B",
                    "#F26522",
                    "#A11F37"
                ],
                borderColor: [
                    "#efefef",
                    "#efefef",
                    "#efefef",
                    "#efefef",
                    "#efefef",
                    "#efefef"
                ],
                borderWidth: 6
            }]
        },
        options: {
            cutoutPercentage: 87.5,
            responsive: true,
            legend: {
                display: false
            },
            plugins: {
                deferred: {
                    delay: 375,
                    yOffset: "50%"
                }
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data[ "labels" ][ tooltipItem[ 0 ][ "index" ] ];
                    },
                    label: function (tooltipItem, data) {
                        return;
                    }
                },
                backgroundColor: "#111",
                caretSize: 8,
                cornerRadius: 2,
                titleFontSize: 24,
                titleFontColor: "#efefef",
                titleFontStyle: "normal",
                titleMarginBottom: 2,
                displayColors: false,
                xPadding: 24,
                yPadding: 24
            }
        }

    });

    document.getElementById("chart").onclick = function ( evt ) {

        //get the point clicked on from chartjs API
        const $_activePts = chart.getElementsAtEvent(evt);
        //get segment index from click point & use it to get label
        const $_segIndex = $_activePts[ 0 ]._index;
        const $_subject = $_activePts[ 0 ]._chart.config.data.labels[ $_segIndex ];
        /*
         * Convert label to url with hash parameters data-form-id of
         * Squarespace form and curriculum subject that gets decoded
         * on ideas page load to pre-fill email newsletter form
         *
         */
        const relUrl = "/ideas#mce-IDEAS=" + $_subject;

        window.location.href = relUrl;

    };

};



/******************************************************************************
 * Export
*******************************************************************************/
export default charts;