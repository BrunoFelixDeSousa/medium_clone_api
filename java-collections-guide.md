# Guia Completo da Interface Collection em Java para Competições de Programação

## Índice
1. [Introdução à Interface Collection](#introdução-à-interface-collection)
2. [Métodos Principais da Interface Collection](#métodos-principais-da-interface-collection)
3. [Hierarquia de Collections](#hierarquia-de-collections)
4. [Métodos Adicionais Importantes](#métodos-adicionais-importantes)
5. [Implementações Mais Usadas](#implementações-mais-usadas)
6. [Exemplos Práticos para Competições](#exemplos-práticos-para-competições)
7. [Comparação de Performance](#comparação-de-performance)
8. [Boas Práticas](#boas-práticas)

## Introdução à Interface Collection

A interface `Collection` é a raiz da hierarquia de coleções em Java. Ela define um "contrato" que especifica as operações básicas que devem estar disponíveis para qualquer grupo de objetos. É fundamental para competições de programação, pois oferece estruturas de dados otimizadas para diferentes cenários.

```java
public interface Collection<E> extends Iterable<E> {
    // Métodos de modificação básicos
    boolean add(E element);
    boolean remove(Object o);
    void clear();
    
    // Métodos de consulta
    boolean contains(Object o);
    int size();
    boolean isEmpty();
    
    // Iteração
    Iterator<E> iterator();
    
    // Métodos de conversão
    Object[] toArray();
    <T> T[] toArray(T[] a);
    
    // Operações em lote
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    boolean containsAll(Collection<?> c);
    
    // Métodos do Java 8+
    default Stream<E> stream();
    default boolean removeIf(Predicate<? super E> filter);
    default void forEach(Consumer<? super E> action);
}
```

## Métodos Principais da Interface Collection

### 1. `boolean add(E element)`
Adiciona um elemento à coleção.

**Complexidade:** Varia por implementação
- ArrayList: O(1) amortizado, O(n) no pior caso
- LinkedList: O(1)
- HashSet: O(1) amortizado
- TreeSet: O(log n)

```java
List<Integer> lista = new ArrayList<>();
lista.add(5);           // true - elemento adicionado
lista.add(10);          // true - elemento adicionado
System.out.println(lista); // [5, 10]

Set<String> conjunto = new HashSet<>();
conjunto.add("java");   // true - elemento adicionado
conjunto.add("java");   // false - elemento já existe
```

**Uso em competições:** Fundamental para construir estruturas de dados dinamicamente.

### 2. `boolean remove(Object o)`
Remove a primeira ocorrência do elemento especificado.

**Complexidade:** Varia por implementação
- ArrayList: O(n) - precisa buscar e reorganizar
- LinkedList: O(n) - precisa buscar
- HashSet: O(1) amortizado
- TreeSet: O(log n)

```java
List<Integer> numeros = Arrays.asList(1, 2, 3, 2, 4);
numeros = new ArrayList<>(numeros);
numeros.remove(Integer.valueOf(2)); // Remove o primeiro 2
System.out.println(numeros); // [1, 3, 2, 4]
```

### 3. `boolean contains(Object o)`
Verifica se a coleção contém o elemento especificado.

**Complexidade:**
- ArrayList: O(n)
- HashSet: O(1) amortizado
- TreeSet: O(log n)

```java
Set<String> palavras = Set.of("java", "python", "cpp");
System.out.println(palavras.contains("java"));   // true
System.out.println(palavras.contains("rust"));   // false
```

**Uso em competições:** Essencial para verificações rápidas de existência.

### 4. `int size()` e `boolean isEmpty()`
Retorna o número de elementos e verifica se está vazia.

**Complexidade:** O(1) para todas as implementações padrão

```java
List<String> lista = new ArrayList<>();
System.out.println(lista.isEmpty()); // true
System.out.println(lista.size());    // 0

lista.addAll(Arrays.asList("a", "b", "c"));
System.out.println(lista.isEmpty()); // false
System.out.println(lista.size());    // 3
```

### 5. `void clear()`
Remove todos os elementos da coleção.

**Complexidade:** O(n) para a maioria das implementações

```java
List<Integer> numeros = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println(numeros.size()); // 5
numeros.clear();
System.out.println(numeros.size()); // 0
System.out.println(numeros.isEmpty()); // true
```

### 6. `Iterator<E> iterator()`
Retorna um iterador para percorrer a coleção.

```java
Set<String> cores = Set.of("vermelho", "verde", "azul");
Iterator<String> it = cores.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// Forma moderna com enhanced for loop
for (String cor : cores) {
    System.out.println(cor);
}
```

## Hierarquia de Collections

### Diagrama da Hierarquia

```
Collection<E>
├── List<E>
│   ├── ArrayList<E>
│   ├── LinkedList<E>
│   └── Vector<E>
├── Set<E>
│   ├── HashSet<E>
│   ├── LinkedHashSet<E>
│   └── SortedSet<E>
│       └── TreeSet<E>
└── Queue<E>
    ├── LinkedList<E>
    ├── ArrayDeque<E>
    └── PriorityQueue<E>
```

### List Interface
**Características:**
- Permite elementos duplicados
- Mantém ordem de inserção
- Acesso por índice

**Principais implementações:**
- `ArrayList`: Array redimensionável
- `LinkedList`: Lista duplamente ligada

### Set Interface
**Características:**
- Não permite elementos duplicados
- Métodos baseados em equals() e hashCode()

**Principais implementações:**
- `HashSet`: Hash table, sem ordem
- `LinkedHashSet`: Hash table + lista ligada, mantém ordem de inserção
- `TreeSet`: Árvore balanceada, ordem natural ou comparator

### Queue Interface
**Características:**
- Estrutura FIFO (First In, First Out)
- Métodos especiais para inserção, remoção e inspeção

**Principais implementações:**
- `LinkedList`: Implementa tanto List quanto Queue
- `ArrayDeque`: Array circular redimensionável
- `PriorityQueue`: Heap para prioridades

## Métodos Adicionais Importantes

### Operações em Lote

#### `boolean addAll(Collection<? extends E> c)`
Adiciona todos os elementos da coleção especificada.

```java
List<Integer> lista1 = new ArrayList<>(Arrays.asList(1, 2, 3));
List<Integer> lista2 = Arrays.asList(4, 5, 6);
lista1.addAll(lista2);
System.out.println(lista1); // [1, 2, 3, 4, 5, 6]
```

#### `boolean removeAll(Collection<?> c)`
Remove todos os elementos que estão na coleção especificada.

```java
List<Integer> numeros = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
List<Integer> paraRemover = Arrays.asList(2, 4);
numeros.removeAll(paraRemover);
System.out.println(numeros); // [1, 3, 5]
```

#### `boolean retainAll(Collection<?> c)`
Mantém apenas os elementos que estão na coleção especificada (interseção).

```java
Set<String> conjunto1 = new HashSet<>(Arrays.asList("a", "b", "c", "d"));
Set<String> conjunto2 = Set.of("b", "c", "e");
conjunto1.retainAll(conjunto2);
System.out.println(conjunto1); // [b, c]
```

#### `boolean containsAll(Collection<?> c)`
Verifica se contém todos os elementos da coleção especificada.

```java
List<String> palavras = Arrays.asList("java", "python", "cpp", "rust");
List<String> buscar = Arrays.asList("java", "python");
System.out.println(palavras.containsAll(buscar)); // true
```

### Conversão para Array

#### `Object[] toArray()`
```java
List<String> linguagens = Arrays.asList("Java", "Python", "C++");
Object[] array = linguagens.toArray();
```

#### `<T> T[] toArray(T[] a)`
```java
List<String> linguagens = Arrays.asList("Java", "Python", "C++");
String[] array = linguagens.toArray(new String[0]);
// Ou pré-dimensionado: new String[linguagens.size()]
```

### Métodos do Java 8+

#### `Stream<E> stream()`
```java
List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<Integer> pares = numeros.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println(pares); // [2, 4, 6, 8, 10]
```

#### `boolean removeIf(Predicate<? super E> filter)`
```java
List<Integer> numeros = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
numeros.removeIf(n -> n % 2 == 0); // Remove números pares
System.out.println(numeros); // [1, 3, 5]
```

#### `void forEach(Consumer<? super E> action)`
```java
List<String> nomes = Arrays.asList("Ana", "Bruno", "Carlos");
nomes.forEach(System.out::println);
```

## Implementações Mais Usadas

### ArrayList vs LinkedList

| Aspecto | ArrayList | LinkedList |
|---------|-----------|------------|
| **Estrutura** | Array redimensionável | Lista duplamente ligada |
| **Acesso por índice** | O(1) | O(n) |
| **Inserção no final** | O(1) amortizado | O(1) |
| **Inserção no meio** | O(n) | O(1) se tiver referência |
| **Remoção** | O(n) | O(1) se tiver referência |
| **Uso de memória** | Menor overhead | Maior overhead (ponteiros) |

```java
// ArrayList - melhor para acesso aleatório
List<Integer> arrayList = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    arrayList.add(i);
}
// Acesso rápido: arrayList.get(500) é O(1)

// LinkedList - melhor para inserções/remoções frequentes
List<Integer> linkedList = new LinkedList<>();
for (int i = 0; i < 1000; i++) {
    linkedList.add(0, i); // Inserção no início é O(1)
}
```

### HashSet vs TreeSet vs LinkedHashSet

| Aspecto | HashSet | TreeSet | LinkedHashSet |
|---------|---------|---------|---------------|
| **Ordenação** | Sem ordem | Ordem natural/Comparator | Ordem de inserção |
| **Inserção** | O(1) amortizado | O(log n) | O(1) amortizado |
| **Busca** | O(1) amortizado | O(log n) | O(1) amortizado |
| **Remoção** | O(1) amortizado | O(log n) | O(1) amortizado |
| **Uso de memória** | Médio | Médio | Maior |

```java
// HashSet - mais rápido, sem ordem
Set<String> hashSet = new HashSet<>();
hashSet.addAll(Arrays.asList("c", "a", "b"));
System.out.println(hashSet); // Ordem aleatória: [a, b, c] ou [c, b, a]

// TreeSet - ordenado automaticamente
Set<String> treeSet = new TreeSet<>();
treeSet.addAll(Arrays.asList("c", "a", "b"));
System.out.println(treeSet); // [a, b, c]

// LinkedHashSet - mantém ordem de inserção
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.addAll(Arrays.asList("c", "a", "b"));
System.out.println(linkedSet); // [c, a, b]
```

### HashMap vs TreeMap vs LinkedHashMap

| Aspecto | HashMap | TreeMap | LinkedHashMap |
|---------|---------|---------|---------------|
| **Ordenação** | Sem ordem | Ordem natural/Comparator | Ordem de inserção |
| **Get/Put** | O(1) amortizado | O(log n) | O(1) amortizado |
| **Uso de memória** | Médio | Médio | Maior |

```java
// HashMap - mais rápido
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("banana", 3);
hashMap.put("apple", 1);
hashMap.put("cherry", 2);

// TreeMap - ordenado por chave
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.putAll(hashMap);
System.out.println(treeMap); // {apple=1, banana=3, cherry=2}

// LinkedHashMap - ordem de inserção
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.putAll(hashMap);
System.out.println(linkedMap); // Ordem de inserção preservada
```

### PriorityQueue

Implementa uma fila de prioridade usando heap binário.

```java
// Min-heap (padrão)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.addAll(Arrays.asList(5, 2, 8, 1, 9));
System.out.println(minHeap.poll()); // 1 (menor elemento)

// Max-heap (usando Comparator)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
maxHeap.addAll(Arrays.asList(5, 2, 8, 1, 9));
System.out.println(maxHeap.poll()); // 9 (maior elemento)

// Heap customizado para objetos
class Tarefa {
    String nome;
    int prioridade;
    
    Tarefa(String nome, int prioridade) {
        this.nome = nome;
        this.prioridade = prioridade;
    }
    
    @Override
    public String toString() {
        return nome + "(" + prioridade + ")";
    }
}

PriorityQueue<Tarefa> tarefas = new PriorityQueue<>(
    Comparator.comparingInt(t -> t.prioridade)
);
tarefas.add(new Tarefa("Estudar", 1));
tarefas.add(new Tarefa("Trabalhar", 3));
tarefas.add(new Tarefa("Exercitar", 2));

while (!tarefas.isEmpty()) {
    System.out.println(tarefas.poll()); // Ordem: Estudar(1), Exercitar(2), Trabalhar(3)
}
```

## Exemplos Práticos para Competições

### 1. Problema: Encontrar Elementos Únicos

**Cenário:** Dado um array, encontre todos os elementos que aparecem apenas uma vez.

```java
public static List<Integer> elementosUnicos(int[] arr) {
    Map<Integer, Integer> contador = new HashMap<>();
    
    // Contar frequências
    for (int num : arr) {
        contador.put(num, contador.getOrDefault(num, 0) + 1);
    }
    
    // Encontrar elementos únicos
    List<Integer> unicos = new ArrayList<>();
    for (Map.Entry<Integer, Integer> entry : contador.entrySet()) {
        if (entry.getValue() == 1) {
            unicos.add(entry.getKey());
        }
    }
    
    return unicos;
}

// Exemplo de uso
int[] array = {1, 2, 3, 2, 4, 5, 1};
List<Integer> resultado = elementosUnicos(array);
System.out.println(resultado); // [3, 4, 5]
```

### 2. Problema: Top K Elementos Mais Frequentes

**Cenário:** Encontrar os K elementos mais frequentes em um array.

```java
public static List<Integer> topKFrequentes(int[] nums, int k) {
    // Contar frequências
    Map<Integer, Integer> frequencia = new HashMap<>();
    for (int num : nums) {
        frequencia.put(num, frequencia.getOrDefault(num, 0) + 1);
    }
    
    // Min-heap baseado na frequência
    PriorityQueue<Integer> heap = new PriorityQueue<>(
        Comparator.comparingInt(frequencia::get)
    );
    
    for (int num : frequencia.keySet()) {
        heap.add(num);
        if (heap.size() > k) {
            heap.poll();
        }
    }
    
    return new ArrayList<>(heap);
}

// Exemplo de uso
int[] nums = {1, 1, 1, 2, 2, 3};
List<Integer> resultado = topKFrequentes(nums, 2);
System.out.println(resultado); // [2, 1] ou [1, 2]
```

### 3. Problema: Sliding Window Maximum

**Cenário:** Encontrar o máximo em todas as janelas de tamanho K.

```java
public static int[] slidingWindowMaximum(int[] nums, int k) {
    if (nums.length == 0 || k == 0) return new int[0];
    
    Deque<Integer> deque = new ArrayDeque<>();
    int[] resultado = new int[nums.length - k + 1];
    
    for (int i = 0; i < nums.length; i++) {
        // Remove elementos fora da janela
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }
        
        // Remove elementos menores que o atual
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.pollLast();
        }
        
        deque.addLast(i);
        
        // Se a janela está completa, adiciona o máximo
        if (i >= k - 1) {
            resultado[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    
    return resultado;
}

// Exemplo de uso
int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
int[] resultado = slidingWindowMaximum(nums, 3);
System.out.println(Arrays.toString(resultado)); // [3, 3, 5, 5, 6, 7]
```

### 4. Problema: Intersecção de Múltiplos Arrays

**Cenário:** Encontrar elementos comuns em múltiplos arrays.

```java
public static List<Integer> intersecaoMultiplosArrays(int[][] arrays) {
    if (arrays.length == 0) return new ArrayList<>();
    
    Map<Integer, Integer> contador = new HashMap<>();
    
    // Processar o primeiro array
    for (int num : arrays[0]) {
        contador.put(num, 1);
    }
    
    // Processar os arrays restantes
    for (int i = 1; i < arrays.length; i++) {
        Set<Integer> vistos = new HashSet<>();
        for (int num : arrays[i]) {
            if (contador.containsKey(num) && !vistos.contains(num)) {
                contador.put(num, contador.get(num) + 1);
                vistos.add(num);
            }
        }
    }
    
    // Coletar elementos presentes em todos os arrays
    List<Integer> resultado = new ArrayList<>();
    for (Map.Entry<Integer, Integer> entry : contador.entrySet()) {
        if (entry.getValue() == arrays.length) {
            resultado.add(entry.getKey());
        }
    }
    
    Collections.sort(resultado);
    return resultado;
}

// Exemplo de uso
int[][] arrays = {
    {1, 2, 3, 4},
    {2, 3, 4, 5},
    {3, 4, 5, 6}
};
List<Integer> resultado = intersecaoMultiplosArrays(arrays);
System.out.println(resultado); // [3, 4]
```

## Comparação de Performance

### Tabela de Complexidades

| Operação | ArrayList | LinkedList | HashSet | TreeSet | HashMap | TreeMap |
|----------|-----------|------------|---------|---------|---------|---------|
| **Inserção** | O(1)* | O(1) | O(1)* | O(log n) | O(1)* | O(log n) |
| **Busca** | O(n) | O(n) | O(1)* | O(log n) | O(1)* | O(log n) |
| **Remoção** | O(n) | O(1)** | O(1)* | O(log n) | O(1)* | O(log n) |
| **Acesso por índice** | O(1) | O(n) | N/A | N/A | N/A | N/A |

*Amortizado
**Se tiver referência para o nó

### Benchmark de Performance

```java
public class BenchmarkCollections {
    private static final int N = 100000;
    
    public static void benchmarkInsertion() {
        // ArrayList
        long start = System.currentTimeMillis();
        List<Integer> arrayList = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            arrayList.add(i);
        }
        long arrayListTime = System.currentTimeMillis() - start;
        
        // LinkedList
        start = System.currentTimeMillis();
        List<Integer> linkedList = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            linkedList.add(i);
        }
        long linkedListTime = System.currentTimeMillis() - start;
        
        // HashSet
        start = System.currentTimeMillis();
        Set<Integer> hashSet = new HashSet<>();
        for (int i = 0; i < N; i++) {
            hashSet.add(i);
        }
        long hashSetTime = System.currentTimeMillis() - start;
        
        // TreeSet
        start = System.currentTimeMillis();
        Set<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < N; i++) {
            treeSet.add(i);
        }
        long treeSetTime = System.currentTimeMillis() - start;
        
        System.out.println("Inserção de " + N + " elementos:");
        System.out.println("ArrayList: " + arrayListTime + "ms");
        System.out.println("LinkedList: " + linkedListTime + "ms");
        System.out.println("HashSet: " + hashSetTime + "ms");
        System.out.println("TreeSet: " + treeSetTime + "ms");
    }
    
    public static void benchmarkSearch() {
        // Preparar dados
        List<Integer> arrayList = new ArrayList<>();
        Set<Integer> hashSet = new HashSet<>();
        Set<Integer> treeSet = new TreeSet<>();
        
        for (int i = 0; i < N; i++) {
            arrayList.add(i);
            hashSet.add(i);
            treeSet.add(i);
        }
        
        Random random = new Random();
        int[] searchValues = new int[1000];
        for (int i = 0; i < 1000; i++) {
            searchValues[i] = random.nextInt(N);
        }
        
        // Benchmark ArrayList
        long start = System.currentTimeMillis();
        for (int value : searchValues) {
            arrayList.contains(value);
        }
        long arrayListTime = System.currentTimeMillis() - start;
        
        // Benchmark HashSet
        start = System.currentTimeMillis();
        for (int value : searchValues) {
            hashSet.contains(value);
        }
        long hashSetTime = System.currentTimeMillis() - start;
        
        // Benchmark TreeSet
        start = System.currentTimeMillis();
        for (int value : searchValues) {
            treeSet.contains(value);
        }
        long treeSetTime = System.currentTimeMillis() - start;
        
        System.out.println("Busca de 1000 elementos:");
        System.out.println("ArrayList: " + arrayListTime + "ms");
        System.out.println("HashSet: " + hashSetTime + "ms");
        System.out.println("TreeSet: " + treeSetTime + "ms");
    }
}
```

## Boas Práticas

### 1. Interface vs Implementação Concreta

**✅ Recomendado:**
```java
List<String> lista = new ArrayList<>();
Set<Integer> conjunto = new HashSet<>();
Map<String, Integer> mapa = new HashMap<>();
```

**❌ Evitar:**
```java
ArrayList<String> lista = new ArrayList<>();
HashSet<Integer> conjunto = new HashSet<>();
HashMap<String, Integer> mapa = new HashMap<>();
```

**Vantagem:** Flexibilidade para trocar implementações sem alterar o código.

### 2. Inicialização Eficiente

**Para tamanho conhecido:**
```java
// Evita redimensionamentos desnecessários
List<Integer> lista = new ArrayList<>(1000);
Set<String> conjunto = new HashSet<>(100);
Map<String, Integer> mapa = new HashMap<>(50);
```

**Para dados conhecidos:**
```java
// Java 9+ - Factory methods
List<String> linguagens = List.of("Java", "Python", "C++");
Set<Integer> numeros = Set.of(1, 2, 3, 4, 5);
Map<String, Integer> idades = Map.of("Ana", 25, "Bruno", 30);

// Versões anteriores
List<String> linguagens = Arrays.asList("Java", "Python", "C++");
Set<Integer> numeros = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
```

### 3. Tratamento de Valores Null

**Implementações que permitem null:**
- `ArrayList`, `LinkedList`
- `HashSet`, `LinkedHashSet`
- `HashMap`, `LinkedHashMap`

**Implementações que NÃO permitem null:**
- `TreeSet`, `TreeMap`
- `PriorityQueue`

```java
// Cuidado com NullPointerException
List<String> lista = new ArrayList<>();
lista.add(null); // OK
lista.add("test");

// TreeSet não permite null
Set<String> treeSet = new TreeSet<>();
// treeSet.add(null); // Lança NullPointerException

// Verificação segura
if (lista.contains(null)) {
    System.out.println("Lista contém null");
}
```

### 4. Equals e HashCode

Para usar objetos customizados em `HashSet` ou como chaves em `HashMap`:

```java
public class Pessoa {
    private String nome;
    private int idade;
    
    public Pessoa(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Pessoa pessoa = (Pessoa) obj;
        return idade == pessoa.idade && 
               Objects.equals(nome, pessoa.nome);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(nome, idade);
    }
    
    @Override
    public String toString() {
        return nome + "(" + idade + ")";
    }
}

// Uso
Set<Pessoa> pessoas = new HashSet<>();
pessoas.add(new Pessoa("Ana", 25));
pessoas.add(new Pessoa("Ana", 25)); // Duplicata - não será adicionada
System.out.println(pessoas.size()); // 1
```

### 5. Iteração Eficiente

**Enhanced for loop (recomendado):**
```java
List<String> lista = Arrays.asList("a", "b", "c");
for (String item : lista) {
    System.out.println(item);
}
```

**Iterator para remoção segura:**
```java
List<Integer> numeros = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Iterator<Integer> it = numeros.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) {
        it.remove(); // Remove de forma segura
    }
}
System.out.println(numeros); // [1, 3, 5]
```

**Streams para operações funcionais:**
```java
List<String> palavras = Arrays.asList("java", "python", "javascript", "cpp");
List<String> longas = palavras.stream()
    .filter(p -> p.length() > 4)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
System.out.println(longas); // [JAVASCRIPT, PYTHON]
```

### 6. Escolha da Implementação Adequada

**Para listas:**
- Use `ArrayList` quando precisar de acesso por índice frequente
- Use `LinkedList` quando fizer muitas inserções/remoções no meio

**Para conjuntos:**
- Use `HashSet` para performance máxima sem ordem
- Use `LinkedHashSet` quando precisar manter ordem de inserção
- Use `TreeSet` quando precisar de ordenação automática

**Para mapas:**
- Use `HashMap` para performance máxima
- Use `LinkedHashMap` para manter ordem de inserção
- Use `TreeMap` para ordenação automática por chave

**Para filas:**
- Use `ArrayDeque` para fila/pilha simples
- Use `PriorityQueue` para fila de prioridade
- Use `LinkedList` se precisar de acesso por índice

### 7. Otimizações para Competições

```java
// Leitura rápida de input
public class FastReader {
    BufferedReader br;
    StringTokenizer st;
    
    public FastReader() {
        br = new BufferedReader(new InputStreamReader(System.in));
    }
    
    String next() {
        while (st == null || !st.hasMoreElements()) {
            try {
                st = new StringTokenizer(br.readLine());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return st.nextToken();
    }
    
    int nextInt() {
        return Integer.parseInt(next());
    }
}

// Template para problemas com collections
public class Solution {
    public static void main(String[] args) {
        FastReader fr = new FastReader();
        
        int n = fr.nextInt();
        List<Integer> numeros = new ArrayList<>(n);
        
        for (int i = 0; i < n; i++) {
            numeros.add(fr.nextInt());
        }
        
        // Sua solução aqui
        System.out.println(resolverProblema(numeros));
    }
    
    private static int resolverProblema(List<Integer> numeros) {
        // Implementação do algoritmo
        return 0;
    }
}
```

## Resumo para Competições

### Cheat Sheet Rápido

**Estruturas mais usadas:**
1. `ArrayList<>()` - Lista dinâmica
2. `HashSet<>()` - Conjunto único
3. `HashMap<>()` - Mapa chave-valor
4. `PriorityQueue<>()` - Heap/Fila de prioridade
5. `ArrayDeque<>()` - Fila/Pilha

**Operações O(1):**
- `HashMap`: get, put, remove
- `HashSet`: add, contains, remove
- `ArrayList`: get, set (por índice)
- `ArrayDeque`: addFirst, addLast, removeFirst, removeLast

**Quando usar cada estrutura:**
- **Busca rápida**: `HashSet` ou `HashMap`
- **Ordenação**: `TreeSet` ou `TreeMap`
- **Fila de prioridade**: `PriorityQueue`
- **Acesso por índice**: `ArrayList`
- **Inserções no início**: `LinkedList` ou `ArrayDeque`

Esta documentação fornece uma base sólida para usar Collections em Java de forma eficiente em competições de programação, com foco em performance e praticidade.