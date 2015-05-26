/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Class.define("svg.demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
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
      
      this._addCircle();

    },

    _addCircle : function()
    {
      var doc = this.getRoot();
      
      var svgWidget = new svg.embed.Svg();

      doc.add(svgWidget,
      {
        left   : 0,
        right  : 0,
        top    : 0,
        bottom : 0
      });
      
      var svgroot = svgWidget.getSvg();
      
      // create a defs section
      var defs = new svg.struct.Defs();
      svgroot.add(defs);

      // prepare a pattern for the grid
      var gridPattern = new svg.paint.Pattern();
      
      gridPattern.setId("gridPattern");
      gridPattern.setX(0);
      gridPattern.setY(0);
      gridPattern.setWidth(20);
      gridPattern.setHeight(20);
      gridPattern.setPatternUnits("userSpaceOnUse");
      defs.add(gridPattern);

      // prepare the grid pattern body
      var gridPath = new svg.path.Path();
      gridPath.setStroke("black");
      gridPath.setStrokeWidth(0.25);
      gridPath.setFill("#EEF");
      gridPath.setPathData("M 20 0 L 0 0 0 20");  // triangle
      gridPattern.add(gridPath);

      // create and add the grid
      var gridRect = new svg.shape.Rect();
      gridRect.setId("grid");
      gridRect.setWidth("100%");
      gridRect.setHeight("100%");
      gridRect.setFill(gridPattern);
      svgroot.add(gridRect);

      // prepare a group for the circle chunks
      var circleGroup = new svg.struct.Group();
      circleGroup.setId("circle");
      svgroot.add(circleGroup);

      // create the big chunk
      var bigChunk = new svg.path.Path();
      bigChunk.setStroke("black");
      bigChunk.setStrokeWidth(2);
      bigChunk.setFill("red");
      circleGroup.add(bigChunk);

      // create the pathdata for the big chunk
      var bigChunkPD = new svg.path.PathData();
      bigChunkPD.moveTo(300, 200);
      bigChunkPD.lineTo(-150, 0, true);
      bigChunkPD.arc(150, 150, 0, true, false, 150, -150, true);
      bigChunkPD.closePath();

      // apply the big chunk path data
      bigChunk.setPathData(bigChunkPD);

      // create the small chunk
      var smallChunk = new svg.path.Path();
      smallChunk.setStroke("black");
      smallChunk.setStrokeWidth(4);
      smallChunk.setFill("yellow");
      circleGroup.add(smallChunk);

      // create the pathdata for the small chunk
      var smallChunkPD = new svg.path.PathData();
      smallChunkPD.moveTo(275, 175);
      smallChunkPD.lineTo(0, -150, true);
      smallChunkPD.arc(150, 150, 0, false, false, -150, 150, true);
      smallChunkPD.closePath();

      // apply the small chunk path data
      smallChunk.setPathData(smallChunkPD);
    }
  }
});