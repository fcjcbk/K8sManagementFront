<template>
    <el-select v-model="value" class="m-2" placeholder="Select" size="large" style="margin-bottom: 10px;">
        <el-option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <span class="block-element">Please upload .yaml file to create pod</span>
    <div>
        <a-upload :file-list="fileList" :before-upload="beforeUpload" :max-count="1" @remove="handleRemove">
            <a-button>
                <upload-outlined></upload-outlined>
                Select File
            </a-button>
        </a-upload>
        <a-button type="primary" :disabled="fileList!.length === 0" :loading="uploading" style="margin-top: 16px"
            @click="handleUpload">
            {{ uploading ? 'Uploading' : 'Start Upload' }}
        </a-button>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
import { ElMessage, } from 'element-plus'
import axios from 'axios';


const fileList = ref<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

const handleRemove: UploadProps['onRemove'] = file => {
    const index = fileList.value!.indexOf(file);
    const newFileList = fileList.value!.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

const beforeUpload: UploadProps['beforeUpload'] = file => {
    fileList.value = [file];
    return false;
};

interface Res {
    code: number
    message: string
}
const handleUpload = async () => {
    // uploading.value = true;
    console.log(value.value)

    if (fileList.value!.length > 0) {
        const formData = new FormData();
        uploading.value = true;

        formData.append('nodeName', value.value)
        formData.append('file', fileList.value![0] as any)


        try {
            const response = await axios.post(`http://127.0.0.1:8080/v1/CreatePod`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            ElMessage(response.data)

        } catch (error) {
            ElMessage.error(error)
        }
        uploading.value = false
        const newFileList = fileList.value!.slice();
        newFileList.splice(0, 1);
        fileList.value = newFileList;
    } else {
        ElMessage({
            message: "please select a node or upload file first",
            type: 'warning'
        })
    }
};


const value = ref('')


const getNodes = () => fetch('http://localhost:8080/v1/nodes', {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        const result: select_item[] = [];
        for (let i = 0; i < data.length; i++) {
            result.push({
                value: data[i].name,
                label: data[i].name,
            });
        }
        result.push({ value: '', label: "scheduled by system" })

        nodes.value = result
    })
    .catch((error) => {
        console.log(error)
        ElMessage.error(error)
    })

onMounted(async () => {
    await getNodes()
})



interface select_item {
    value: string
    label: string
}

const nodes = ref<select_item[]>()


</script>

<style scoped>
.block-element {
    display: block;
    padding: 10px;
}
</style>