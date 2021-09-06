<template>
  <div class="w-100vw h-screen flex justify-center items-center bg-gray-400">
    <div class="bg-white w-96 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="example@gmail.com"
          @blur="intoEmail"
          v-model="email"
        />
        <p v-if="!validEmail && enteredEmail" class="text-red-500 text-xs italic">
          Ingrese un correo valido.
        </p>
      </div>
      <div class="mb-6 flex justify-center">
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-500"
        >
          <svg
            class="w-8 h-8"
            fill="#1f2937"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">{{
            updatedFile ? file.name : "Seleccione Archivo"
          }}</span>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            class="hidden"
            @change="uploadButton($event)"
          />
        </label>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md disabled:opacity-50"
          type="button"
          :disabled="!(validEmail && updatedFile)"
          @click="sendData"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const email = ref("");
const enteredEmail = ref(false);
const validEmail = ref(false);
const updatedFile = ref(false);
const file = ref({ name: "" });

watch(email, (email) => {
  validEmail.value = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
});

const sendData = async () => {
  console.log(email.value);
  console.log(validEmail.value);
  let res;
  try {
    res = await fetch(
      "https://ohtqk07i4c.execute-api.us-east-2.amazonaws.com/default/endpoint",
      {
        method: "POST",
        body: JSON.stringify({
          fileName: file.value.name,
          fileSize: String(file.value.size),
        }),
      }
    );
  } catch (error) {
    return alert("Error subiendo el archivo");
  }

  const { result, ulrSigned } = await res.json();

  if (result !== "success") {
    return alert("Error subiendo el archivo");
  }
  try {
    res = await fetch(ulrSigned, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file.value,
    });
  } catch (error) {
    return alert("Error subiendo el archivo");
  }

  const resultPut = await res.json();
  console.log(resultPut);
};

const intoEmail = () => {
  enteredEmail.value = true;
};

const uploadButton = (event) => {
  const auxFile = event.target.files || event.dataTransfer.files;
  if (!auxFile.length) return;
  file.value = auxFile[0];
  const reader = new FileReader();
  if (auxFile[0].name.split(".")[1] !== "csv") {
    return alert("Wrong file type - CSV only.");
  }
  if (auxFile[0].size > 20000) {
    return alert("Wrong file too weight");
  }
  let dataURL = "";
  reader.onload = function () {
    dataURL = reader.result;
  };
  reader.readAsDataURL(auxFile[0]);
  updatedFile.value = true;
};
</script>
