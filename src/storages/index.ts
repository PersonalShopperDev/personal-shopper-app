import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValueOf } from '../types/common';

interface BaseFieldsValue<T> {
  description: string;
  defaultValue: T;
}

export class Storage<FieldsTypes extends Record<string, any>> {
  private storageName: string;
  private fields;

  constructor(
    storageName: string,
    fields: Record<keyof FieldsTypes, BaseFieldsValue<ValueOf<FieldsTypes>>>,
  ) {
    this.fields = fields;
    this.storageName = storageName;
  }

  // set 할 때는 객체를 받는다 자동으로 stringify 해서 저장;
  set<N extends keyof FieldsTypes>(fieldsName: N, fieldsValue: FieldsTypes[N]) {
    AsyncStorage.setItem(`${this.storageName}-${fieldsName}`, JSON.stringify(fieldsValue));
  }

  // 데이터가 없으면 default value값 넘겨주기
  async get<N extends keyof FieldsTypes>(fieldsName: N): Promise<FieldsTypes[N]> {
    const fieldsValue = await AsyncStorage.getItem(`${this.storageName}-${fieldsName}`);
    let result;

    if (fieldsValue === null) {
      result = this.fields[fieldsName].defaultValue;
    } else {
      if (typeof this.fields[fieldsName] === 'boolean') result = Boolean(fieldsValue);
      else if (typeof this.fields[fieldsName] === 'number') result = Number(fieldsValue);
      else if (typeof this.fields[fieldsName] === 'string') result = String(fieldsValue);
      else result = JSON.parse(fieldsValue);
    }

    return result;
  }

  removeAll() {
    const keys = Object.keys(this.fields);
    AsyncStorage.multiRemove(keys);
  }
}
