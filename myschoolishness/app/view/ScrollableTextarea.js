Ext.define('myschoolishness.view.ScrollableTextarea', {
    extend: 'Ext.field.TextArea',
    alias: 'widget.mytextarea',
	xtype: 'scrollabletextarea',

    initialize: function(){
        var me = this;


        me.callParent();


        me.getComponent().input.on({
            scope: this,
            'dragstart': me._onStart,
            'drag' : me._onMove,
            'dragend' : me._onEnd
        });
    },


    _onStart: function(e){
        e.stopPropagation();
        return false;
    },


    _onMove: function(e, element){
        var me = this,
            input = me.getComponent().input,
            deltaY = - e.previousDeltaY,
            deltaX = - e.previousDeltaX;


        if(element === input.dom){


            element.scrollTop = element.scrollTop + deltaY;
            element.scrollLeft = element.scrollLeft + deltaX;
        }


        e.stopPropagation();
        
        return false;
    },


    _onEnd: function(e){
        e.stopPropagation();
        return false;


    }




});