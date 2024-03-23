import { atom } from 'jotai';
import $ from 'jquery';

const StateAtom = atom<JSX.Element | null>(null);

export const DialogContentAtom = atom(
  (get) => {
    return get(StateAtom);
  },
  (_get, set, content: JSX.Element | null) => {
    const isOpen = content != null;
    const body = document.getElementById("body")
    if (body != null) {
      if (isOpen) {
        body.style.overflow = "hidden"
      } else {
        body.style.overflow = "scroll"
      }
    }
    set(StateAtom, content);
  },
);
