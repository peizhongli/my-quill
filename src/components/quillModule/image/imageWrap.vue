<template>
    <div>
        <input type="file" @change="checkFile" accept="image/png, image/jpeg, image/gif, image/jpg" ref="input">
    </div>
</template>
<script>
import { upgradeCenterMessage } from "@/common/util";

export default {
    props: {
        image: {
            type: Object,
            default: {
                count: 5,
                maxSize: 2*1024*1024,

            }
        }
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        addFile() {
            this.$refs.input.click()
        },
        checkFile() {
            let fileWrap = this.$refs.input
            let file = fileWrap.files[0]
            // if(files.length>this.image.count) {
            //     upgradeCenterMessage(this,"error", `最多可上传${this.image.count}张图片`)
            //     return
            // }
            
            if(Math.floor(file.size/1024)>this.image.maxSize) {
                upgradeCenterMessage(this,"error", `可上传图片最大尺寸为${this.image.maxSize}M`)
                return
            }
            this.upload(file)
        },
        upload(file) {
            let formData = new FormData()
            formData.append('file',file)
            this.$handleRequest({
                    route: `/preview/uploadImg`,
                    method: "post",
                    data: formData
                },
                data => {
                    console.log(data)
                    this.insertImage(data)
                },
                error => {
                    upgradeCenterMessage(this, "error", error.message);
                }
            )
        },
        insertImage(url) {
            let parent = this.$parent.$parent
            let quill = parent.quill // quill组件
            quill.insertEmbed(parent.range.index, 'image', url);
            quill.setSelection(parent.range.index + 1, 0);
        }
    },
    created() {
        console.log(this.$global)
    }
}
</script>
<style scoped>
    input {
        display: none;
    }
</style>