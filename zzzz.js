var CHUNK_SIZE = 128 * 1024 * 1024;

function upload(file, uploadUrl, onSuccess, onProgress, onError) {
    var chunkCount = Math.ceil(file.size / CHUNK_SIZE);

    function uploadChunk(file, chunkNum, videoId, chunksLoadedSize) {
        var from = CHUNK_SIZE * chunkNum;
        var blob = file.slice(from, from + CHUNK_SIZE);

        var formData = new FormData();
        if (videoId !== false) {
            formData.append("videoId", videoId);
        }
        formData.append("file", blob, file.name);

        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.status >= 300) {
                return onError(chunkNum, chunkCount, this);
            }

            videoId = JSON.parse(xhr.responseText).videoId;

            if (onSuccess) {
                onSuccess(chunkNum, chunkCount, videoId, this);
            }

            if (chunkNum < chunkCount - 1) {
                uploadChunk(file, chunkNum + 1, videoId, chunksLoadedSize);
            }
        };
        xhr.onerror = function () {
            if (onError) {
                onError(chunkNum, chunkCount, this);
            }
        };
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var progress = ((chunksLoadedSize + e.loaded) * 100) /file.size;
                onProgress(progress)
            }
        };
        xhr.upload.onload = function (e) {
            if (e.lengthComputable) {
                chunksLoadedSize += e.loaded;
            }
        };
        xhr.open("POST", uploadUrl, true);
        xhr.setRequestHeader("Content-Range", "bytes " + from + "-" + (from + blob.size - 1) + "/" + file.size);
        xhr.send(formData);
    }
    uploadChunk(file, 0, false, 0);
}

$(document).ready(function() {

    $(".dropzone-upload-video").on('click', function(){
        $('#dropzone-input').click();
    });

    $('#dropzone-input').on('change', function(){
        if($(this).val() !== '') {
            var selectedEnv = $(".env-tab.active").attr("tab-id");
            var currentDropzone = $("#" + selectedEnv + " .dropzone-upload-video")
            var uploadUrl = currentDropzone.data('upload-action-'+selectedEnv)

            currentDropzone.addClass('loading');
            window.onbeforeunload = function(event) {
                return "You have a pending upload. Do you really want to leave ?";
            };
            
            upload(
                $(this)[0].files[0],
                uploadUrl,
                function (chunkNum, chunkCount, videoId, xhr) {
                    if(chunkNum + 1 === chunkCount){
                        var goLink = currentDropzone.data('upload-redirect-'+selectedEnv);
                        $('.upload-success a').attr('href', goLink);
                        $('.upload-success').removeClass('d-none');
                        currentDropzone.removeClass('loading');
                        $('#dropzone-input').val('');
                        window.onbeforeunload = null;
                    }
                },
                function (progress) {
                    currentDropzone.attr("data-content", parseInt(progress) + " %")
                },
                function (chunkNum, chunkCount, xhr) {
                    var jsonErr = JSON.parse(xhr.responseText);
                    $('.upload-errors .err-title').html(jsonErr.title);
                    $('.upload-errors .err-type').html(jsonErr.type).attr('href', jsonErr.type);
                    $('.upload-errors').removeClass('d-none');
                    currentDropzone.removeClass('loading');
                    $('#dropzone-input').val('');
                }
            );
        }
    });

    $('.dropzone-upload-video').on('drag dragstart dragend dragover dragenter dragleave drop', function(e){
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function(e){
        $(this).addClass('dragged-over');
    })
    .on('dragend drop', function(e){
        $(this).removeClass('dragged-over');
    })
    .on('drop', function(e){
        $('#dropzone-input')[0].files = e.originalEvent.dataTransfer.files;
        $('#dropzone-input').change();
    });

});