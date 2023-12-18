<template>
    <!-- <div v-for="tabledata in tableDatas">
        <el-space direction="vertical" alignment="smart" :size=30>
            <el-table :data="tabledata.pods" border=true style="width: 100%">
                <el-table-column :label="'namespace: ' + tabledata.namespace">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" width="500" />
                </el-table-column>
            </el-table>
        </el-space>
    </div> -->


    <el-space direction="vertical" alignment="smart" :size=30>
        <el-table :data="dat" border=true style="width: 100%">
            <el-table-column label="Nodes">
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="createTimeStamp" label="CreateTimeStamp" width="360" />
                <el-table-column prop="remainCPU" label="RemainCPU" width="180" />
                <el-table-column prop="remainMemory" label="RemainMemory" width="180" />
            </el-table-column>
        </el-table>
    </el-space>

</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { ElMessage } from 'element-plus';

async function getData() {
    dat.value = await getNodes()
}

const dat = ref([])

const getNodes = () => fetch('http://localhost:8080/v1/nodes', {
    method: 'GET',
})
    .then(response => response.json())
    .catch((error) => {
        ElMessage.error(error)
        console.log(error)
    })

onBeforeMount(async () => {
    dat.value = await getNodes()
})



</script>
