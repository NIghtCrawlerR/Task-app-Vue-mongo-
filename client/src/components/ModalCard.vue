<template>
  <!-- The modal -->
  <b-modal id="cardModal" ref="cardModal" @hide="$emit('changeMode', 'edit')" :title="mode=='edit'?card.title:'Add new card'">
       <form class="new_card">
          <!--Modal body-->
            <div class="form-group">
                <label for="title">Badges</label>
                <select name="data" data-field="badges" multiple="multiple" value="" class="form-control" id="badges">
                    <option value="1">1</option>
                </select>
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name="data" data-field="title" id="title" :value="mode=='edit'?card.title:''" placeholder="Title" required>
            </div>
            <div class="form-group">
                <label for="descr">Description</label>
                <textarea class="form-control" name="data" data-field="descr" id="descr" :value="mode=='edit'?card.descr:''" placeholder="Description"
                    rows="4"></textarea>
            </div>
            <input type="hidden" name="data" data-field="index" value="0">
            <div v-if="mode=='edit' && card.list.length > 0" class="task-list-wrap">
                <div class="form-group task-list" v-for="list in card.list" v-bind:key="$uuid.v1()">
                   
                    <div v-for="(l, key) in list" v-bind:key="key">
                        <div class="handle">|||</div>
                         <span class="list-name">{{key}}</span>
                        <div class="task-list-body">
                            <p :class="item[1] != 0 ? 'checked':''" :data-checked="item[1] != 0 ? 'checked':''" v-for="item in l" v-bind:key="$uuid.v1()">
                                <input type="checkbox" name="data_list" data-field="" :data-task="item[0]" value="0">
                                <span class="checkbox"></span>
                                <span class="task">{{item[0]}}</span>
                                <button type="button" class="close delete-task"><span>×</span></button> 
                            </p>
                        </div>
                        <b-form-input class="mb-3 task-field" name="task" placeholder="Add task..."></b-form-input>
                        <b-button variant="link" size="sm" class="toggle_hidden">Toggle hidden</b-button>
                        <b-button variant="link-danger" size="sm" class="btn-link remove_list">Remove list</b-button>
                    </div>
                    
                </div>
            </div>
            <div class="task-list-wrap">
                <b-button variant="primary" size="sm" class="add_list">Add list</b-button>
            </div>
        </form>
         <div slot="modal-footer">
            <div class="for-edit" v-if="mode === 'edit'">
                <b-button variant="success" class="edit_card mr-2">Save</b-button>
                <b-button variant="danger" class="delete_card">Delete</b-button>
            </div>
            <div class="for-add" v-else>
                <button type="submit" class="btn btn-success add_card mr-2">Add card</button>
                <b-button variant="secondary" @click="hideModal" >Cancel</b-button>
            </div>
        </div>
  </b-modal>
</template>

<script>
export default {
  name: "ModalCard",
  props: ['mode', 'card'],
  methods: {
      hideModal: function(){
          this.$refs.cardModal.hide()
      }
  }
};
</script>

<style scoped>
.list-name {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 25px;
    display: inline-block;
}
.task-list {
    background: #f1f1f1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}
.handle {
    float: right;
    transform: rotate(90deg);
    font-size: 20px;
    color: #797979;
    cursor: move;
}
.task-list .task {
    display: inline-block;
    min-width: 86%;
    min-height: 20px;
    margin-left: 30px;
    max-width: 86%;
}
.ghost {
    opacity: .5;
    background: rgb(190, 190, 190);
}
[data-checked=checked] {
    display: none
}
.tasks-track{
    float: right;
}
.btn-link-danger {
    color: #d41a3c;
}
</style>

