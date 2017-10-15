import { animate, AnimationEntryMetadata, state, style, trigger, transition } from '@angular/core';

export const slideInDownAnimation : AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter',[
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('0.2s 0.3s ease-in')
    ]),
    transition(':leave', [
      animate('0.4s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);
