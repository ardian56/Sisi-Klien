// buat object mahasiswa
const mahasiswa = {
    nim: "A11.2022.14493",
    nama: "Ardian Danendra",
    umur: 21,
    status: true,
    matKul: [
        {
            matkulId: 4704,
            matkulNama: "Pemsik",
            tugas: 85,
            uts: 100,
            uas: 50
        },
        {
            matkulId: 4771,
            matkulNama: "Daspro",
            tugas: 60,
            uts: 100,
            uas: 80
        },
    ]
}

// buat array
const listMahasiswa = ["Ardian","Danendra"]; //string

// array of object
const listMahasiswa2 = [
        {   nim: "A11.2022.14493",
            nama: "Ardian Danendra",
            umur: 21,
            status: true,
            matKul: [
                {
                    matkulId: 4704,
                    matkulNama: "Pemsik",
                    tugas: 85,
                    uts: 100,
                    uas: 50
                },
                {
                    matkulId: 4771,
                    matkulNama: "Daspro",
                    tugas: 60,
                    uts: 100,
                    uas: 80
                },
            ]
        },
    {nim: "A11.2022.14494",
            nama: "Budi Haryanto",
            umur: 40,
            status: true,
            matKul: [
                {
                    matkulId: 4704,
                    matkulNama: "Pemsik",
                    tugas: 95,
                    uts: 100,
                    uas: 50
                },
                {
                    matkulId: 4771,
                    matkulNama: "Daspro",
                    tugas: 65,
                    uts: 100,
                    uas: 80
                },
            ]
        },
];

// tampilkan object mahasiswa
console.log(mahasiswa);

// tampilkan array
console.log(listMahasiswa);
console.log(listMahasiswa2);

// tampilkan array index 0 dan array index 1
console.log(listMahasiswa[0]);
console.log(listMahasiswa[1]);
console.log(listMahasiswa2[0]);
console.log(listMahasiswa2[1]);

// tampilkan key nama dari object mahasiswa
console.log(mahasiswa.nama);
console.log(mahasiswa.nim)

//ES6 - Destructuring

//Destructuring Object
const{nama, nim} = mahasiswa;
console.log(nama);
console.log(nim);

//Destructuring Array
const{dataArdian, dataBudi} = listMahasiswa2

//Destructuring Array Dari list matakulianya milik variable mahasiswa
const [DataPemsik, DataDaspro] = mahasiswa.matKul;
console.log(DataPemsik);
console.log(DataDaspro);

//ES6 - Spread Operator
const mhs2 = {
    nim: "A11.2022.14494",
           nama: "Budi Haryanto",
            umur: 40,
            status: true,
            matKul: [
                {
                    matkulId: 4704,
                    matkulNama: "Pemsik",
                    tugas: 95,
                    uts: 100,
                    uas: 50
                },
                {
                    matkulId: 4771,
                    matkulNama: "Daspro",
                    tugas: 65,
                    uts: 100,
                    uas: 80
                },
            ]
}

const listMhs = { ...mahasiswa, mhs2};

console.log(listMhs);

//ES5 - Template Literal
console.log("Nama saya " + nama + " dan NIM saya " + nim);
//ES6
console.log(`nama saya ${nama} nim saya ${nim}`);