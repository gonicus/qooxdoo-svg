/* ************************************************************************

   Copyright:
     2010  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

qx.Class.define("svg.demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
  
    //the SVG element to draw on (which contained by the SVG widget)
    _svg : null,
    
    //path data of the path that's currently being drawed (if any)
    _pathdata: null,
    
    //widgets from the pen toolbox
    _tools: null,
    
  
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
      
      /*
       * Start of SVG freedraw demo code 
       */
      
      var svgWidget = new svg.embed.Svg();
      this.getRoot().add(svgWidget, {
        left   : 0,
        right  : 0,
        top    : 0,
        bottom : 0
      });
      
      this.createToolbox();
      
      this._svg = svgWidget.getSvg();
      
      this._svg.addListener("mousedown", this._startDraw, this);
      this._svg.addListener("mousemove", this._draw, this);
      this._svg.addListener("mouseup", this._endDraw, this);      
    },
    
    _startDraw : function(evt) {
      
      //create a new path element
      var path = new svg.path.Path().set({
        fill: "none",
        stroke: this._tools.color.getValue(),
        strokeWidth: this._tools.pensize.getValue(),
        linecap: "round"
      });
      
      //create new path data and attach it to the path
      var pathdata = new svg.path.PathData();
      pathdata.moveTo(evt.getDocumentLeft(), evt.getDocumentTop());
      path.setPathData(pathdata);
      
      //store the created path data
      this._pathdata = pathdata;
      
      this._svg.add(path);
    },
    
    _draw : function(evt) {
      if (this._pathdata != null) {
        this._pathdata.lineTo(evt.getDocumentLeft(), evt.getDocumentTop());
      }
    },
    
    _endDraw : function(evt) {
      this._pathdata = null;
    },
    
    createToolbox : function() {
      
      var layout = new qx.ui.layout.VBox();
      layout.setSpacing(5);
      
      var toolbox = new qx.ui.window.Window("Pen").set({
        layout: layout,
        showMinimize: false,
        showMaximize: false,
        showClose: false,
        resizable: false
      });
      
      toolbox.add(new qx.ui.basic.Label("Size: "));
      
      var pensize = new qx.ui.form.Spinner().set({
        minimum: 1,
        maximum: 100,
        value: 5
      });
      toolbox.add(pensize);
      

      var colorpopup = new qx.ui.control.ColorPopup();
      colorpopup.exclude();
      colorpopup.setValue("red");
      
      
      var colorbox = new qx.ui.container.Composite().set({
        width: 50,
        height: 25,
        backgroundColor: colorpopup.getValue()
      });
      
      colorbox.addListener("click", function(e) {
        colorpopup.placeToWidget(colorbox);
        colorpopup.show();
      });
      
      toolbox.add(new qx.ui.basic.Label("Color: "));
      toolbox.add(colorbox);
      
      colorpopup.addListener("changeValue", function(e) {
        colorbox.setBackgroundColor(e.getData());
      });
      
      this._tools = {
          pensize: pensize,
          color: colorpopup
      };
      
      toolbox.open();
    }
  }
});