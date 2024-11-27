/**
 * Автозапуск видео rutube во всплывающем окне
 */

import { Fancybox } from "@fancyapps/ui";
function rutubeFbPlay(){
    try {
        Fancybox.bind("[data-video='rutube']", {
            on: {
                reveal: (fancybox, slide) => {

                    setTimeout(function(){
                        const { iframeEl: player } = slide;
                        player.contentWindow.postMessage(JSON.stringify({
                            type: 'player:play',
                            data: {}
                        }), '*');
                    },1000);

                },
            },
        });
    } catch (err) {
        console.error('Error initializing Fancybox for Rutube:', err);
    }
}
export default rutubeFbPlay;