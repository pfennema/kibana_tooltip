import { i18n } from '@kbn/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { TooltipPluginStart } from './types';
import { PLUGIN_NAME } from '../common';
import axios from 'axios';

export var posX = 0;
export var posY = 0;
export var dd = {};        // global data dictionary for current page, works only when a index pattern is shown on page (e.g. discover page)

function get_data_dictionary()
{
  axios.get(`/api/tooltip/get_data_dictionary/`)
  .then((response) => {
     dd = response.data;
  })
  .catch((error) => {
    if (error.response){
      console.log(error.response);
    } else if(error.request){
      console.log(error.request);
    } else if(error.message){
      console.log(error.message);
    }
  })
}

export class TooltipPlugin implements Plugin<TooltipPluginSetup, TooltipPluginStart> {
  public setup(core: CoreSetup): TooltipPluginSetup {
  console.log("Setup tooltip, get data dictionary");
    get_data_dictionary();
  }

  public start(core: CoreStart): TooltipPluginStart {
      const $style = document.createElement("style");
      document.head.appendChild($style);
      $style.innerHTML =
      '.tooltip {' +
      'box-sizing: border-box;' +
      'position: absolute;' +
      // 'display:none;' +
      'border: 1px solid #bebebe;' +
      'z-index: 100;' +
      'background: #ffff00;' +
      'border-radius: 5px;' +
      'padding: 2px 5px;'
      '}';

    const onAltClick = (event) => {
      if (!event.altKey) {
        return;
      }
      show_tooltip(event);
    }

    window.addEventListener('click', onAltClick);
    return {};
  }

  public stop() {}
}

function show_tooltip(event) {
  var selected_text = get_text(event)
  if (selected_text in dd) {  // Only if description is defined a tooltip is needed
      var description = dd[selected_text];
      //text = "info: " + description
      createTip(event, description);
      // make sure tooltip is removed as soon as mouse is moved
      document.addEventListener('mousemove', removeTip );
  }
}

function get_text(e) {
      // check which text under cursor is clicked
      var sel=window.getSelection();
      var str=sel.anchorNode.nodeValue;
      var len=str.length;
      var a;
      var b;
      a=b=sel.anchorOffset;

      while(str[a]!=' '&&a--){}; if (str[a]==' ') a++; // start of word
      while(str[b]!=' '&&b++<len){};                   // end of word+1
      var selected_text = str.substring(a,b).split(':')[0]
      return selected_text;
}

function removeTip(event) {
    if (event.clientX != posX || event.clientY != posY) {
      document.querySelectorAll('.tooltip').forEach(function(a){
        a.remove()
     })
     document.removeEventListener("mousemove",removeTip);
    }
}

function createTip(ev,text){
    var relX = ev.clientX + window.pageXOffset;
    var relY = ev.clientY + window.pageYOffset;
    var firstChild = document.body.firstChild;//gets the first elem after body
    var offset = 5;
    posX = relX;  // store to verify whether mouse moved
    posY = relY;
    var tooltipWrap = document.createElement("div"); //creates div
    tooltipWrap.className = 'tooltip'; //adds class
    tooltipWrap.appendChild(document.createTextNode(text)); //add the text node to the newly created div.
    firstChild.parentNode.insertBefore(tooltipWrap, firstChild); //adds tt before elem
    relY -= tooltipWrap.getBoundingClientRect().height + offset;
    relX += offset;
    tooltipWrap.setAttribute('style','left:'+relX+'px;'+'top:'+relY+'px;')
}

