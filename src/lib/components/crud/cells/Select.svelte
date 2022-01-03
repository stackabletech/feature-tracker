<script lang="ts">
	export let value;
	export let options;
	export let optional = false;
</script>

<td>
	<select id="select" name="select" class="select w-full" bind:value>
		{#if optional}
			<option value="" />
		{/if}
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>
</td>
