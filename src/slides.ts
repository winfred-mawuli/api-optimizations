import { Slide } from './types';

const slides: Slide[] = [
  {
    title: "API Performance Optimization",
    subtitle: "Using DTOs & Mapping Strategies in Spring Boot",
    duration: "90 min",
    objectives: [
      "Understand why exposing entities directly is bad for API performance and security",
      "Implement DTOs (Data Transfer Objects) for safe and efficient data exchange",
      "Apply manual and automated mapping strategies",
      "Choose between mapping tools like MapStruct and ModelMapper",
      "Follow best practices for designing performant and maintainable API responses"
    ],
    content: [
      "Welcome to this comprehensive lecture on API Performance Optimization in Spring Boot. We'll explore how DTOs and smart mapping strategies can dramatically improve your API's performance, security, and maintainability.",
      "By the end of this session, you'll have practical knowledge to implement these patterns in production applications."
    ]
  },
  {
    title: "Introduction to DTOs",
    duration: "10 min",
    subtitle: "Understanding Data Transfer Objects",
    content: [
      "A Data Transfer Object (DTO) is a plain object used to transfer data between layers, especially between the backend and frontend.",
      {
        type: 'list',
        items: [
          "Prevent over-fetching or under-fetching of data",
          "Avoid exposing internal database structures",
          "Control what is sent over the wire (security)",
          "Improve serialization performance",
          "Enable custom shapes of responses for different clients"
        ]
      },
      {
        type: 'comparison',
        bad: {
          title: "❌ Problem Without DTOs",
          code: `// Entity exposed directly (Anti-pattern)
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll(); // BAD PRACTICE!
    }
}`,
          description: "This exposes sensitive data, causes performance issues, and tightly couples your API to your database schema."
        },
        good: {
          title: "✅ Better With DTOs",
          code: `public class UserDTO {
    private String username;
    private String email;
    // No sensitive fields like password
    // Constructors, getters, setters...
}

@GetMapping("/users")
public List<UserDTO> getUsers() {
    return userService.getAllUsersAsDTO();
}`,
          description: "Clean separation of concerns, better security, and improved performance."
        }
      }
    ]
  },
  {
    title: "Common DTO Use Cases",
    duration: "10 min",
    content: [
      "DTOs serve multiple purposes in modern API design:",
      {
        type: 'list',
        items: [
          "Projection of specific fields only",
          "Combining data from multiple sources",
          "Pagination and filtering responses",
          "Request validation objects (input DTOs)",
          "API versioning and backward compatibility",
          "Flattening complex object hierarchies"
        ]
      },
      {
        type: 'code',
        code: `// Example: Different DTOs for different use cases
public class UserSummaryDTO {
    private String username;
    private String email;
}

public class UserProfileDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime lastLogin;
}

public class UserRegistrationDTO {
    private String username;
    private String email;
    private String password;
    // Used only for input validation
}`
      }
    ]
  },
  {
    title: "Manual DTO Mapping",
    duration: "15 min",
    content: [
      "Manual mapping gives you complete control over the transformation process.",
      {
        type: 'code',
        code: `// Create DTO Class
public class ProductDTO {
    private String name;
    private BigDecimal price;
    private String categoryName;
    
    public ProductDTO(String name, BigDecimal price, String categoryName) {
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
    }
    
    // Getters and setters...
}`
      },
      {
        type: 'code',
        code: `// Map in Service or Controller
@Service
public class ProductService {
    
    public List<ProductDTO> getProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
            .map(product -> new ProductDTO(
                product.getName(), 
                product.getPrice(),
                product.getCategory().getName()
            ))
            .collect(Collectors.toList());
    }
}`
      },
      {
        type: 'comparison',
        bad: {
          title: "❌ Cons of Manual Mapping",
          description: "Boilerplate code, Hard to maintain with many fields, Error-prone for complex objects"
        },
        good: {
          title: "✅ Pros of Manual Mapping",
          description: "Full control over transformation, No extra dependencies, Easy to debug"
        }
      }
    ]
  },
  {
    title: "ModelMapper - Runtime Mapping",
    duration: "12 min",
    content: [
      "ModelMapper provides automatic mapping using reflection at runtime.",
      {
        type: 'code',
        language: 'xml',
        code: `<!-- Add dependency to pom.xml -->
<dependency>
  <groupId>org.modelmapper</groupId>
  <artifactId>modelmapper</artifactId>
  <version>3.1.1</version>
</dependency>`
      },
      {
        type: 'code',
        code: `// Basic usage
ModelMapper modelMapper = new ModelMapper();
ProductDTO dto = modelMapper.map(product, ProductDTO.class);`
      },
      {
        type: 'code',
        code: `// Spring Configuration
@Configuration
public class ModelMapperConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}

@Service
public class ProductService {
    @Autowired
    private ModelMapper modelMapper;
    
    public ProductDTO convertToDto(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }
}`
      },
      {
        type: 'benefit',
        text: "Automatic field mapping based on naming conventions"
      },
      {
        type: 'warning',
        text: "Runtime reflection overhead, can be slow for large datasets"
      }
    ]
  },
  {
    title: "MapStruct - Compile-time Mapping",
    duration: "13 min",
    subtitle: "Recommended for High Performance",
    content: [
      "MapStruct generates mapper implementations at compile time, providing zero runtime overhead.",
      {
        type: 'code',
        language: 'xml',
        code: `<!-- Add to pom.xml -->
<dependency>
  <groupId>org.mapstruct</groupId>
  <artifactId>mapstruct</artifactId>
  <version>1.5.5.Final</version>
</dependency>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <configuration>
    <annotationProcessorPaths>
      <path>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>1.5.5.Final</version>
      </path>
    </annotationProcessorPaths>
  </configuration>
</plugin>`
      },
      {
        type: 'code',
        code: `// Create Mapper Interface
@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDto(Product product);
    Product toEntity(ProductDTO dto);
    
    List<ProductDTO> toDtoList(List<Product> products);
    
    // Custom mapping for complex fields
    @Mapping(source = "category.name", target = "categoryName")
    ProductDTO toDetailedDto(Product product);
}`
      },
      {
        type: 'code',
        code: `// Use in Service
@Service
public class ProductService {
    @Autowired
    private ProductMapper productMapper;
    
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return productMapper.toDtoList(products);
    }
}`
      },
      {
        type: 'list',
        items: [
          "Zero runtime cost (compile-time generation)",
          "Great performance for large systems",
          "Supports complex nested mappings",
          "Type-safe mapping with compile-time validation",
          "Easy to debug generated code"
        ]
      }
    ]
  },
  {
    title: "Performance Optimization Examples",
    duration: "15 min",
    subtitle: "Real-World Scenarios",
    content: [
      "Let's explore concrete examples of how DTOs improve API performance:",
      {
        type: 'comparison',
        bad: {
          title: "❌ Avoid Over-fetching",
          code: `// This returns full entity with all relationships
@Query("SELECT p FROM Product p")
List<Product> findAll(); // Loads everything!`,
          description: "Loads unnecessary data, slow serialization, potential N+1 queries"
        },
        good: {
          title: "✅ Use Projection or DTO",
          code: `// Custom query with DTO constructor
@Query("SELECT new com.example.ProductDTO(p.name, p.price) FROM Product p")
List<ProductDTO> findAllProjected();

// Or with interface projection
public interface ProductView {
    String getName();
    BigDecimal getPrice();
}`,
          description: "Minimal data transfer, faster queries, reduced memory usage"
        }
      },
      {
        type: 'code',
        code: `// Pagination + DTO for large datasets
@Service
public class ProductService {
    
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
            .map(productMapper::toDto);
    }
    
    // Efficient search with projection
    @Query("SELECT new ProductDTO(p.name, p.price, c.name) " +
           "FROM Product p JOIN p.category c " +
           "WHERE p.name LIKE %:name%")
    List<ProductDTO> searchProducts(@Param("name") String name);
}`
      }
    ]
  },
  {
    title: "Avoiding N+1 Query Problem",
    duration: "8 min",
    content: [
      "The N+1 query problem is a common performance killer when using entities directly.",
      {
        type: 'comparison',
        bad: {
          title: "❌ N+1 Query Problem",
          code: `// This will cause multiple queries if users have addresses
List<User> users = userRepository.findAll();
// For each user, Hibernate may fire separate queries for addresses
users.forEach(user -> {
    System.out.println(user.getAddress().getCity()); // N+1 queries!
});`,
          description: "1 query for users + N queries for addresses = Performance nightmare"
        },
        good: {
          title: "✅ Single Query with DTO",
          code: `// Custom JPQL with JOIN FETCH
@Query("SELECT new com.example.UserDTO(u.username, a.city) " +
       "FROM User u JOIN u.address a")
List<UserDTO> fetchUsersWithCity();

// Or use @EntityGraph
@EntityGraph(attributePaths = {"address"})
List<User> findAllWithAddress();`,
          description: "Single optimized query, predictable performance"
        }
      },
      {
        type: 'benefit',
        text: "DTOs force you to think about what data you actually need, preventing accidental N+1 scenarios"
      }
    ]
  },
  {
    title: "Best Practices for DTO Usage",
    duration: "10 min",
    content: [
      "Follow these proven practices for optimal results:",
      {
        type: 'list',
        items: [
          "Never expose entities in API responses - always use DTOs",
          "Create separate DTOs for request and response when they differ",
          "For complex APIs, use layered mapping: Entity ↔ Domain ↔ DTO",
          "Use MapStruct for high-performance production systems",
          "Use annotations like @JsonIgnore, @JsonProperty for fine control",
          "Prefer Java Records for immutable DTOs (Java 17+)",
          "Group related DTOs in packages by feature/domain"
        ]
      },
      {
        type: 'code',
        code: `// Java 17+ Record DTOs (Immutable)
public record ProductDTO(
    String name,
    BigDecimal price,
    String categoryName
) {}

// Validation with Bean Validation
public record CreateProductRequest(
    @NotBlank String name,
    @DecimalMin("0.01") BigDecimal price,
    @NotNull Long categoryId
) {}`
      },
      {
        type: 'tip',
        text: "Use different DTO packages: .dto.request, .dto.response, .dto.internal for better organization"
      }
    ]
  },
  {
    title: "Response Wrappers",
    duration: "5 min",
    subtitle: "Standardizing API Responses",
    content: [
      "Consistent response structure improves API usability and error handling:",
      {
        type: 'code',
        code: `// Generic API Response Wrapper
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private String timestamp;
    private List<String> errors;
    
    // Constructors and static factory methods
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data, 
                               LocalDateTime.now().toString(), null);
    }
    
    public static <T> ApiResponse<T> error(String message, List<String> errors) {
        return new ApiResponse<>(false, message, null, 
                               LocalDateTime.now().toString(), errors);
    }
}`
      },
      {
        type: 'code',
        code: `// Usage in Controllers
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.success(products));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        ProductDTO created = productService.createProduct(request);
        return ResponseEntity.status(201).body(ApiResponse.success(created));
    }
}`
      },
      {
        type: 'benefit',
        text: "Consistent error handling, easier client-side processing, better API documentation"
      }
    ]
  },
  {
    title: "Advanced Performance Strategies",
    duration: "12 min",
    content: [
      "Advanced techniques for maximum performance:",
      {
        type: 'code',
        code: `// 1. Caching DTOs (not entities)
@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<ProductDTO> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
            .map(productMapper::toDto);
    }
}`
      },
      {
        type: 'code',
        code: `// 2. Async DTO Processing for Complex Data
@Service
public class OrderService {
    
    @Async
    public CompletableFuture<OrderSummaryDTO> processOrderAsync(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        OrderSummaryDTO dto = orderMapper.toSummaryDto(order);
        // Additional processing...
        return CompletableFuture.completedFuture(dto);
    }
}`
      },
      {
        type: 'code',
        code: `// 3. Streaming Large Datasets
@GetMapping(value = "/export", produces = MediaType.APPLICATION_NDJSON_VALUE)
public StreamingResponseBody exportProducts() {
    return outputStream -> {
        ObjectMapper mapper = new ObjectMapper();
        productRepository.findAllStream()
            .map(productMapper::toDto)
            .forEach(dto -> {
                try {
                    outputStream.write(mapper.writeValueAsBytes(dto));
                    outputStream.write("\\n".getBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
    };
}`
      }
    ]
  },
  {
    title: "Performance Comparison Table",
    duration: "5 min",
    content: [
      {
        type: 'table',
        headers: ['Optimization Strategy', 'Technique', 'Performance Impact', 'Tool'],
        rows: [
          ['Reduce payload size', 'Use tailored DTOs', 'High', 'Manual or MapStruct'],
          ['Avoid N+1 queries', 'Custom JPQL + DTOs', 'Very High', 'Spring Data'],
          ['Improve serialization', 'Flat DTOs', 'Medium', 'Jackson'],
          ['Avoid circular refs', 'Flatten relationships', 'Medium', 'DTO + Jackson'],
          ['Optimize pagination', 'Projected DTO with Pageable', 'High', 'Spring Data'],
          ['Compile-time mapping', 'Use MapStruct', 'Very High', 'MapStruct'],
          ['Safe updates', 'Partial DTOs', 'Low', 'PATCH Support'],
          ['Caching', 'Cache DTOs only', 'Very High', 'Spring Cache'],
          ['Read-only optimization', 'Interface projections', 'High', 'Spring Data JPA']
        ]
      },
      {
        type: 'tip',
        text: "Focus on 'Very High' impact optimizations first - they provide the biggest performance gains"
      }
    ]
  },
  {
    title: "Hands-On Demo",
    duration: "15 min",
    subtitle: "Building a Complete Example",
    content: [
      "Let's build a real-world example step by step:",
      {
        type: 'code',
        code: `// 1. Entity
@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private BigDecimal price;
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // ... other fields
}`
      },
      {
        type: 'code',
        code: `// 2. DTO
public record ProductDTO(
    Long id,
    String name,
    BigDecimal price,
    String categoryName,
    LocalDateTime createdAt
) {}`
      },
      {
        type: 'code',
        code: `// 3. MapStruct Mapper
@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.name", target = "categoryName")
    ProductDTO toDto(Product product);
    
    List<ProductDTO> toDtoList(List<Product> products);
}`
      },
      {
        type: 'code',
        code: `// 4. Optimized Repository
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("SELECT new ProductDTO(p.id, p.name, p.price, c.name, p.createdAt) " +
           "FROM Product p JOIN p.category c")
    List<ProductDTO> findAllOptimized();
    
    @Query("SELECT p FROM Product p JOIN FETCH p.category")
    Page<Product> findAllWithCategory(Pageable pageable);
}`
      }
    ]
  },
  {
    title: "Summary & Key Takeaways",
    duration: "5 min",
    content: [
      "Key points to remember from this lecture:",
      {
        type: 'table',
        headers: ['Bad Practice', 'Good Practice'],
        rows: [
          ['Exposing entities directly', 'Always use DTOs'],
          ['Manual field copying everywhere', 'Use MapStruct for reusability'],
          ['Over-fetching relationships', 'Use projections/custom queries'],
          ['Inconsistent response shapes', 'Standardize with DTOs + wrappers'],
          ['Runtime reflection mapping', 'Prefer compile-time generation']
        ]
      },
      {
        type: 'list',
        items: [
          "DTOs are essential for production APIs - they improve performance, security, and maintainability",
          "MapStruct is the best choice for high-performance systems due to compile-time generation",
          "Always design your queries with the end DTO in mind to avoid N+1 problems",
          "Use different DTOs for different use cases - don't try to create one DTO that fits all",
          "Implement response wrappers for consistent API design",
          "Profile your API endpoints to validate performance improvements"
        ]
      },
      {
        type: 'tip',
        text: "Start with DTOs from day one - retrofitting them into existing applications is much harder"
      }
    ]
  },
  {
    title: "Further Reading & Next Steps",
    duration: "3 min",
    content: [
      "Continue your learning journey with these resources:",
      {
        type: 'list',
        items: [
          "MapStruct Official Documentation - Advanced mapping techniques",
          "Spring Data Projections Guide - Alternative approaches to DTOs",
          "Spring Boot Actuator Metrics - Monitor API performance",
          "JPA Performance Tuning - Database optimization strategies",
          "API Design Best Practices - RESTful design patterns"
        ]
      },
      "Thank you for attending this lecture! Remember to apply these patterns in your next Spring Boot project and measure the performance improvements.",
      {
        type: 'tip',
        text: "Set up performance monitoring in your applications to continuously track the impact of these optimizations"
      }
    ]
  }
];

export default slides;