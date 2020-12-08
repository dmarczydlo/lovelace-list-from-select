class ListFromSelect extends HTMLElement {
    set hass(hass) {
     
      const entityId = this.config.entity;
      const title = this.config.title ?? null;

      const state = hass.states[entityId];
      const list = state ? state.attributes.options : []
     
      if (!this.content) {
        this.card = document.createElement('ha-card');
        this.header = document.createElement('h1');
        this.header.setAttribute('class', 'card-header');
        this.header.setAttribute('id', 'card-title');
        
        this.card.appendChild(this.header);
        
        this.content = document.createElement('div');
        this.content.setAttribute('style', 'padding: 0 15px 15px 15px;')
        this.card.appendChild(this.content);
        this.appendChild(this.card);
      }
  
      if(this.header && title) {
        this.header.innerHTML = `<div class="name">${title}</div>`;
      }

      let elements = '<div>Brak danych</div>';

      const ul = document.createElement('ul');
      ul.setAttribute('style', 'margin: 0;');
      if(list.length > 1) 
      {
        list.forEach(element => {

          if(element !== 'null' && element !== null ) {
            const li = document.createElement('li'); 
            li.innerHTML = element;
            ul.appendChild(li);
          }
        })

        elements = ul.outerHTML;
      }

      this.content.innerHTML = elements
    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('You need to define an entity');
      }
      this.config = config;
    }
  
    getCardSize() {
      return 1;
    }
  }
  
customElements.define('list-from-select', ListFromSelect);