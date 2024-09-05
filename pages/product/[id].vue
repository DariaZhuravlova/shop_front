<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { productMenu } from '@/data/default/productMenu';
import { replaceSpace } from '../utils';
import { useProductStore } from '@/stores/ProductStore';
import { useAppStore } from '@/stores/AppStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const appStore = useAppStore();

async function fetchProduct() {
  try {
    const id = route.params.id;
    console.log(id);

    await productStore.getProduct(id);
  } catch (e) {
    console.error(e);
    // router.push('/');
  }
}

fetchProduct();
</script>