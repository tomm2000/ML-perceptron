export type mnistType = {
  train_images: Uint8Array[]
  train_labels: Uint8Array
  test_images : Uint8Array[]
  test_labels : Uint8Array
}

export async function loadMNIST(): Promise<mnistType> {
  let mnist: mnistType = {
    train_images: [],
    train_labels: new Uint8Array(),
    test_images: [],
    test_labels: new Uint8Array()
  };

  let files = {
    train_images: 'train-images-idx3-ubyte.bin',
    train_labels: 'train-labels-idx1-ubyte.bin',
    test_images : 't10k-images-idx3-ubyte.bin',
    test_labels : 't10k-labels-idx1-ubyte.bin',
  };

  (mnist as any).train_images = await loadFile(files.train_images);
  (mnist as any).train_labels = await loadFile(files.train_labels);
  (mnist as any).test_images  = await loadFile(files.test_images);
  (mnist as any).test_labels  = await loadFile(files.test_labels);

  return mnist
}

async function loadFile(file: string) {
  let buffer = await fetch(file).then(r => r.arrayBuffer());
  let headerCount = 4;
  let headerView = new DataView(buffer, 0, 4 * headerCount);
  let headers = new Array(headerCount).fill(undefined).map((_, i) => headerView.getUint32(4 * i, false));

  // Get file type from the magic number
  let type, dataLength;
  if(headers[0] == 2049) {
    type = 'label';
    dataLength = 1;
    headerCount = 2;
  } else if(headers[0] == 2051) {
    type = 'image';
    dataLength = headers[2] * headers[3];
  } else {
    throw new Error("Unknown file type " + headers[0])
  }

  let data = new Uint8Array(buffer, headerCount * 4);
  if(type == 'image') {
    let dataArr = [];
    for(let i = 0; i < headers[1]; i++) {
      dataArr.push(data.subarray(dataLength * i, dataLength * (i + 1)));
    }
    return dataArr;
  }
  return data;
}

export type dataType = {
  input: number[],
  output: number[]
}

export function getMaxIndex(arr: number[]) {
  return arr.indexOf(Math.max(...arr));
}

export function prepareRandomData(data: Uint8Array[], labels: Uint8Array, amount: number): dataType[] {
  let dataArr: dataType[] = [];

  for(let i = 0; i < amount; i++) {
    let index = Math.floor(Math.random() * data.length);

    let output = new Array(10).fill(0);
    output[labels[index]] = 1;

    let input = new Array(data[index].length)

    for(let j = 0; j < data[index].length; j++) {
      input[j] = data[index][j] / 255;
    }

    dataArr.push({
      input,
      output
    });

  }
  return dataArr;
}