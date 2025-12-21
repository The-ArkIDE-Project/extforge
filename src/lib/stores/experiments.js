import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Load experiments from localStorage or use defaults
function createExperimentsStore() {
  const stored = browser ? localStorage.getItem('experiments') : null;
  const initial = stored ? JSON.parse(stored) : {};
  
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    toggle: (experimentId) => {
      update(state => {
        const newState = {
          ...state,
          [experimentId]: !state[experimentId]
        };
        
        // Persist to localStorage
        if (browser) {
          localStorage.setItem('experiments', JSON.stringify(newState));
        }
        
        return newState;
      });
    },
    set: (experimentId, value) => {
      update(state => {
        const newState = {
          ...state,
          [experimentId]: value
        };
        
        // Persist to localStorage
        if (browser) {
          localStorage.setItem('experiments', JSON.stringify(newState));
        }
        
        return newState;
      });
    },
    reset: () => {
      set({});
      if (browser) {
        localStorage.removeItem('experiments');
      }
    }
  };
}

export const experiments = createExperimentsStore();