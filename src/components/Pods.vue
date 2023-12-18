<template>
    <el-table :data="filterData" style="width: 60%;">
        <el-table-column type="expand">
            <template #default="props">
                <div m="4">
                    <p m="t-0 b-2">namespace: {{ props.row.namespace }}</p>
                    <p m="t-0 b-2">nodename: {{ props.row.nodename }}</p>
                    <h3>Status</h3>
                    <p m="t-0 b-2">phase: {{ props.row.status.phase }}</p>
                    <p m="t-0 b-2">HostIP: {{ props.row.status.hostIP }}</p>
                    <p m="t-0 b-2">PodIP {{ props.row.status.podIP }}</p>

                    <h3>Containers</h3>
                    <el-table :data="props.row.containers">
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="Image" prop="image" />

                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column type="index" />
        <el-table-column label="Name" prop="podName" />
        <el-table-column label="Status" prop="status.phase" />

        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index, scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">Delete</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>

    </el-table>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref, onBeforeMount, onUnmounted } from 'vue';
import { ElMessage, ElPopconfirm } from 'element-plus';

interface Status {
    phase: string
    hostIP: string
    podIP: string
    startTime: string
}

interface Container {
    name: string
    image: string
}

interface Pod {
    podName: string
    namespace: string
    status: Status
    nodename?: string
    containers?: Container[]

}

const data = ref<Pod[]>()

const handleDelete = async (index: number, row: Pod) => {
    // 将内容上传到服务器
    // 重新获取pod信息    
    try {
        const response = await axios.delete('http://localhost:8080/v1/DeletePod', { data: { deleteIndex: index } });
        ElMessage(response.data)
        console.log(response)

    } catch (error) {
        ElMessage.error(error)
    }
    await getPods();
}


const filterData = computed(() =>
    data.value?.filter(
        (pod) =>
            !search.value ||
            pod.podName.toLowerCase().includes(search.value.toLowerCase())
    )
)


const mockData = computed(() =>
    mockdata.filter(
        (pod) =>
            !search.value ||
            pod.podName.toLowerCase().includes(search.value.toLowerCase())
    )
)



const search = ref('')


const getPods = async () => {
    try {
        const response = await axios.get<Pod[]>('http://localhost:8080/v1/pods');
        data.value = response.data
    } catch {
        ElMessage.error("get fail");
    }
    
}


const  timer = ref();

onBeforeMount(async () => {
    // dat.value = await getPods();
    // console.log(dat.value)
    await getPods()
    timer.value = setInterval(getPods, 20000)
})

onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = null
})


const mockdata: Pod[] = [{
    podName: "my-nginx",
    namespace: "default",
    nodename: "node1",
    status: {
        phase: "active",
        hostIP: "localHost",
        podIP: "localhost",
        startTime: "now",
    },
    containers: [
        {
            name: "nginx",
            image: "image",
        }
    ]
}
]

</script>

<style scoped></style>