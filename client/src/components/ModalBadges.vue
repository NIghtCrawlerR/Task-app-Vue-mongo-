<template>
      <b-modal ref="badgeModal" id="add_badges" class="add_badges" title="Add badges">
            <form>
                <!--Modal body-->
                 <h5 class="badges badges-collection mb-3">
                        <span class="badge badge-red mr-1 mb-2">Badge new<span class='del'>✖</span></span>
                    </h5>
                    <div class="form-group">
                        <label for="title">Badge name</label>
                        <input type="text" class="form-control" name="title" id="title" placeholder="Title"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="title">Badge color</label>
                        <br>
                        <span v-bind:key="c" v-for="c in colors" >
                            <input type="radio" :id="c" name="color" :value="c">
                            <label :for="c"></label>
                        </span>
                    </div>
                <!--Modal body-->
            </form>
            <!--Modal footer-->
            <div slot="modal-footer">
                <b-button type="button" class="btn btn-success mr-2">Add</b-button>
                <b-button @click="hideModal" class="btn btn-secondary" >Close</b-button>
            </div>
            <!--Modal footer-->
    </b-modal>
</template>

<script>
export default {
    name: "ModalBadges",
    props: [],
    methods: {
        hideModal: function(){
            this.$refs.badgeModal.hide()
        }
    },
    data(){
        return {
            colors: ['red', 'green', 'yellow', 'blue', 'pink', 'purple']
        }
    }
}
</script>

<style scoped>
input[type=radio]{
    position: absolute;
    left: -9999px;
}
input[type=radio] + label{
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #f1f1f1;
    margin-right: 10px;
    cursor: pointer;
}
input[type=radio]#red + label {
    background: var(--badge-red);
}
input[type=radio]#green + label {
    background: var(--badge-green);
}
input[type=radio]#yellow + label {
    background: var(--badge-yellow);
}
input[type=radio]#blue + label {
    background: var(--badge-blue);
}
input[type=radio]#pink + label {
    background: var(--badge-pink);
}
input[type=radio]#purple + label {
    background: var(--badge-purple);
}
input[type=radio]:checked + label {
    border: 2px solid #fff;
}

#add_badges .modal-content {
    background: #333;
    color: #fff;
}
#add_badges .close {
    color: #fff;
}
#add_badges .modal-header, #add_badges .modal-footer {
    border-color: #5f5f5f;
}

.badge {
    position: relative;
}
.badge .del {
    position: absolute;
    content: '✕';
    color: #000;
    cursor: pointer;
    width: 16px;
    height: 16px;
    border: 1px solid #fff;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    top: -8px;
    right: -8px;
    font-size: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all .2s;
}
.badge:hover .del {
    opacity: 1;
}
.badge {
    color: #fff;
}
.badge-red {
    background: var(--badge-red)
}
.badge-yellow {
    background: var(--badge-yellow)
}
.badge-green {
    background: var(--badge-green)
}
.badge-blue {
    background: var(--badge-blue)
}
.badge-pink {
    background: var(--badge-pink)
}
.badge-purple {
    background: var(--badge-purple)
}
.badge-undefined {
    background: var(--badge-default)
}

.badge:empty {
    display: inline-block !important;
    width: 20px;
    height: 10px;
}
</style>

