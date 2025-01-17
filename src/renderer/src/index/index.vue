<template>
  <el-calendar v-model="value" ref="calendar">
    <template #header="{ date }">
      <div class="header-container">
        <div class="input-wrap">
          <el-input v-model="task" placeholder="输入目标" @keyup.enter="handleAddTask">
            <template #append>
              <el-button @click="handleAddTask" type="primary">确定</el-button>
            </template></el-input>
        </div>
        <div class="date">
          <span>{{ date }}</span>
        </div>
        <div>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-month')">上个月 </el-button>
            <el-button size="small" @click="selectDate('today')">今天</el-button>
            <el-button size="small" @click="selectDate('next-month')">下个月 </el-button>
          </el-button-group>
        </div>
        <div class="task-list">
          <div class="task-item" v-for="(item, index) in taskList" :key="item">
            <el-tag size="large" closable effect="dark" :color="item.color" @close="closeTag(index)"
              @click="handleFinishTask(item)">{{
                item.text
              }}</el-tag>
          </div>
        </div>
      </div>
    </template>
    <template #date-cell="{ data }">
      <div class="cell-container">
        <el-scrollbar>
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
          </p>
          <div>
            <div class="cell-item">
              <div class="wrap" v-for="(item, index) in dateTaskList[data.day]">
                <el-tag size="small" effect="dark" closable style="{color: '#FFF'}" :color="item.color"
                  @close="deleteTaskItem(data.day, index)">{{ item.text }}</el-tag>
              </div>
            </div>
          </div>
        </el-scrollbar>

      </div>

    </template>
  </el-calendar>
</template>

<script setup>
import { ref, watch } from 'vue'
import LocalStorageHelper from '../utils/storage'
import { TAGS_COLOR } from '../utils/constant'
import { formatTime } from '../utils/index.js'
const TASK = 'task'
const DATETASK = 'datetask'
const storageHelp = new LocalStorageHelper()
const task = ref('')
const taskList = ref(storageHelp.getItem(TASK))
const dateTaskList = ref(storageHelp.getItem(DATETASK))
const calendar = ref()
const actDate = ref(formatTime(new Date()))
const value = ref(new Date())
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
const closeTag = (index) => {
  taskList.value?.splice(index, 1)
  storageHelp.setItem(TASK, taskList.value)
}
const handleAddTask = () => {
  if (!task.value) return
  if (!taskList.value) {
    taskList.value = []
  }
  taskList.value.push({ text: task.value, color: TAGS_COLOR[(taskList.value.length + 1) % TAGS_COLOR.length] })
  task.value = ''
  storageHelp.setItem(TASK, taskList.value)
}
const handleFinishTask = (item) => {
  console.log(value.value)
  if (!dateTaskList.value) {
    dateTaskList.value = {}
  }
  let temp = dateTaskList.value[actDate.value]
  if (!temp) temp = []
  temp.push(item)
  dateTaskList.value[actDate.value] = temp
  storageHelp.setItem(DATETASK, dateTaskList.value)
}
const deleteTaskItem = (day, index) => {
  dateTaskList.value[day].splice(index, 1)
  // console.log(dateTaskList.value)
  storageHelp.setItem(DATETASK, dateTaskList.value)
}
watch(() => value.value, (newValue) => {
  actDate.value = formatTime(newValue)

})
</script>
<style>
.el-calendar-table .el-calendar-day {
  height: 130px;
}

.el-calendar__header {
  padding-bottom: 0;
}

.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .input-wrap {
    width: 200px;
  }

  .date {
    flex: 1;
    text-align: center;
  }

  .task-list {
    width: 100vw;
    margin: 8px 0 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .task-item {
      margin-right: 8px;
      margin-bottom: 8px;

      .el-tag {
        border: 0;
        cursor: pointer;
      }

    }
  }
}

.cell-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;

  p {
    margin: 0;
    margin-bottom: 8px;
  }

  .cell-item {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .wrap {
      margin-bottom: 4px;

      .el-tag {
        border: 0;
        cursor: pointer;
      }


    }
  }
}
</style>
