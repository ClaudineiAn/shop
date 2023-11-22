<script>
import { h } from "vue";

export default {
  setup(props, { slots }) {
  
    return () =>
      h("p", {
        innerHTML: slots.default().map(el=>el.children).join(''),
      });
  },
};
</script>
