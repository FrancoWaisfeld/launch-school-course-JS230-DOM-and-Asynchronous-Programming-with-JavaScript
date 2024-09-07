document.addEventListener('DOMContentLoaded', () => {
  (function() {
    inventory = {
      lastId: 0,
      collection: [],
      setDate: function() {
        var date = new Date();
        document.querySelector('#order_date').textContent = date.toUTCString();
      },
  
      cacheTemplate: function() {
        var inventoryTemplate = document.querySelector('#inventory_item');
        this.template = inventoryTemplate.innerHTML;
        inventoryTemplate.remove();
      },
  
      add: function() {
        this.lastId++;
        var item = {
          id: this.lastId,
          name: "",
          stock_number: "",
          quantity: 1
        };
        this.collection.push(item);
  
        return item;
      },
  
      remove: function(idx) {
        this.collection = this.collection.filter(function(item) {
          return item.id !== idx;
        });
      },
  
      get: function(id) {
        let found_item;
  
        this.collection.forEach(function(item) {
          if (item.id === id) {
            found_item = item;
          }
        });
  
        return found_item;
      },
  
      update: function(node) {
        let id = this.findID(node);
        let item = this.get(id);
  
        item.name = node.querySelector('[name^="item_name"]').value;
        item.stock_number = node.querySelector('[name^="item_stock_number"]').value;
        item.quantity = node.querySelector('[name^="item_quantity"]').value;
      },
  
      newItem: function(e) {
        e.preventDefault();
        let item = this.add();
        let temp = document.createElement('template');
        temp.innerHTML = this.template.replace(/ID/g, item.id);
        let newItem = temp.content.firstElementChild;
  
        newItem.querySelector('a.delete').addEventListener('click', this.deleteItem.bind(this));
        newItem.querySelectorAll('input').forEach(input => {
          input.addEventListener('focusout', this.updateItem.bind(this));
        });
  
        document.querySelector("#inventory").appendChild(newItem);
      },
  
      findParent: function(e) {
        return e.target.closest("tr");
      },
  
      findID: function(item) {
        return Number(item.querySelector('input[type="hidden"]').value);
      },
  
      deleteItem: function(e) {
        e.preventDefault();
        let item = this.findParent(e);
        item.remove();
  
        this.remove(this.findID(item));
      },
  
      updateItem: function(e) {
        var item = this.findParent(e);
  
        this.update(item);
      },
  
      bindEvents: function() {
        document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
      },
  
      init: function() {
        this.setDate();
        this.cacheTemplate();
        this.bindEvents();
      }
    };

    inventory.init.call(inventory);
  })();
});

