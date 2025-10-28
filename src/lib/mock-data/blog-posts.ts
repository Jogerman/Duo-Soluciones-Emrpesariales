import { BlogPost } from '@/types/content'
import { authors } from './authors'
import { categories } from './categories'
import { tags, getTagsByIds } from './tags'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'La Reputación Corporativa: Un Intangible que No se Ve, Pero se Siente',
    slug: 'reputacion-corporativa-intangible',
    excerpt:
      'En un entorno empresarial cada vez más expuesto y vigilado, la reputación corporativa se ha consolidado como uno de los activos más valiosos y frágiles de toda organización.',
    content: `
# La Reputación Corporativa: Un Intangible que No se Ve, Pero se Siente

En un entorno empresarial cada vez más expuesto, dinámico y vigilado por todos, la reputación corporativa se ha consolidado como uno de los activos más valiosos y frágiles de toda organización sin importar el sector. Ya no se trata de un accesorio de la comunicación o del marketing, sino de un factor estratégico que incide directamente en la sostenibilidad, la confianza y el valor de mercado de una empresa.

## ¿Qué es la Reputación Corporativa?

> "La reputación corporativa es el resultado de la evaluación colectiva que los diferentes grupos de interés realizan sobre la capacidad de una empresa para satisfacer sus expectativas."
>
> *Fombrun & Van Riel, 2004*

Esta definición nos recuerda que la reputación no es lo que la empresa dice de sí misma, sino lo que sus stakeholders perciben y comunican sobre ella.

## El Valor Estratégico de la Reputación

Estudios como "The Impact of Corporate Reputation on Cost of Debt: A Panel Data Analysis of Indian Listed Firms" demuestran que las organizaciones con una reputación sólida no solo atraen y retienen mejor el talento, sino que también:

- **Acceden a mejores condiciones de financiamiento:** Las instituciones financieras valoran la solidez reputacional
- **Generan mayor lealtad entre sus clientes:** La confianza construye relaciones duraderas
- **Se encuentran mejor preparadas para enfrentar situaciones de crisis:** Una buena reputación actúa como capital social en momentos difíciles

En ese sentido, la reputación se convierte en una **ventaja competitiva sostenible**.

## La Gestión desde el Consejo de Administración

Sin embargo, para que este valor intangible se mantenga, requiere una gestión coherente desde los más altos niveles de decisión: el Consejo de Administración.

**No basta con delegar este tema a las áreas de comunicación o relaciones públicas.** La reputación debe ser un tema permanente en la agenda del Consejo de Administración, con:

- Políticas claras
- Indicadores de seguimiento
- Responsabilidades definidas
- Mecanismos de monitoreo

## La Coherencia como Fundamento

La reputación no se impone con campañas bien estructuradas y complejos planes de relaciones públicas; **se construye con coherencia**.

### Elementos Clave de la Coherencia Reputacional:

1. **Alineación entre discurso y acción:** Lo que se dice debe coincidir con lo que se hace
2. **Consistencia en el tiempo:** Las decisiones deben reflejar valores constantes
3. **Transparencia en la gestión:** La información debe fluir de manera honesta
4. **Responsabilidad social:** El impacto en la comunidad debe ser positivo

## Conclusión

En un mundo donde la información circula instantáneamente y las percepciones se forman rápidamente, cuidar la reputación corporativa es más que nunca una responsabilidad estratégica que debe estar en el corazón de la gobernanza empresarial.

Las empresas que entienden esto y actúan en consecuencia no solo sobreviven, sino que prosperan en mercados cada vez más competitivos y exigentes.

*¿Tu organización tiene la reputación corporativa en su agenda estratégica?*
    `,
    coverImage:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&auto=format&q=80',
    author: authors[2], // Ana Martínez - Consultora de Gobernanza Corporativa
    category: categories[3], // Gobernanza Corporativa
    tags: getTagsByIds(['1', '10', '11', '20']), // Estrategia, Gestión de Riesgos, Cumplimiento, Transformación
    publishedAt: '2025-01-25T10:00:00Z',
    readingTime: 6,
    featured: true,
    seo: {
      metaTitle: 'La Reputación Corporativa: Un Activo Intangible Estratégico',
      metaDescription:
        'Descubre por qué la reputación corporativa es uno de los activos más valiosos de tu organización y cómo gestionarla desde el Consejo de Administración.',
      keywords: [
        'reputación corporativa',
        'gobierno corporativo',
        'consejo de administración',
        'gestión de riesgos',
        'valor intangible',
      ],
    },
  },
  {
    id: '2',
    title: 'Ver Para Creer: El Poder de las Visualizaciones con Power BI',
    slug: 'poder-visualizaciones-power-bi',
    excerpt:
      'Los datos en bruto no dicen mucho si no se presentan de forma comprensible. Descubre cómo Power BI transforma cifras complejas en decisiones estratégicas.',
    content: `
# Ver Para Creer: El Poder de las Visualizaciones con Power BI

Los datos en bruto (Black and White) no dicen mucho si no se presentan de forma comprensible. Ahí es donde herramientas como **Microsoft Power BI** hacen la diferencia. Esta plataforma convierte cifras complejas en gráficos y tableros dinámicos que cualquiera puede entender y explorar en segundos.

Ya no se trata de creer, o la frase *"es que siempre pasa lo mismo todos los años"*. Ahora cambia la percepción por realidades, con números en frente.

## Capacidades que Power BI Brinda a la Gerencia

Con Power BI, la gerencia y los Consejos de Administración tienen la capacidad de:

### 💡 Anticiparse al Futuro
Analizando tendencias en tiempo real y simulando impacto. Los datos históricos permiten proyectar escenarios futuros y tomar decisiones proactivas en lugar de reactivas.

### 💡 Comparar Resultados Fácilmente
Ya sea por:
- Períodos de tiempo
- Áreas organizacionales
- Productos o servicios
- Zonas geográficas
- Tiendas o almacenes
- Vendedores individuales
- Y muchos otros criterios

### 💡 Detectar Oportunidades y Riesgos
Sin tener que esperar un reporte mensual o al super héroe de TI *"Sr. Hay que esperar que el de TI regrese de vacaciones"*. La información está disponible cuando se necesita, no cuando el sistema lo permite.

### 💡 Compartir Tableros Claros
Con el consejo de administración (implementando Buenas Prácticas de Gobernanza) y con todo el equipo, asegurando que todos hablen el mismo idioma y tomen decisiones basadas en la misma información.

## Decisiones Más Rápidas, Comunicación Más Clara

Cuando los líderes de departamentos o áreas operativas trabajan con indicadores bien definidos y visualizaciones intuitivas, no solo toman mejores decisiones, también logran alinear a toda la organización.

Un tablero interactivo es, en resumidas cuentas, **una fuente única de verdad** que:

- ✅ Elimina eternos debates innecesarios
- ✅ Evita confusiones y malentendidos
- ✅ Centra a todos en los objetivos que realmente importan
- ✅ Democratiza el acceso a la información estratégica

## Beneficios Tangibles de Power BI

### Para la Alta Dirección:
- Visión consolidada del negocio en tiempo real
- Capacidad de drill-down para análisis detallado
- Acceso móvil para consulta en cualquier momento
- Alertas automáticas sobre KPIs críticos

### Para los Gerentes Operativos:
- Tableros personalizados por área
- Seguimiento de metas y objetivos
- Identificación rápida de desviaciones
- Información actualizada sin depender de TI

### Para el Consejo de Administración:
- Dashboards ejecutivos con métricas clave
- Capacidad de comparar períodos y escenarios
- Transparencia en la gestión
- Cumplimiento de buenas prácticas de gobernanza

## Transformando la Cultura Organizacional

La implementación de Power BI no es solo una decisión tecnológica, es un cambio cultural. Significa pasar de:

- **Intuición → Datos**
- **Reportes estáticos → Análisis dinámico**
- **Decisiones lentas → Decisiones ágiles**
- **Información limitada → Democratización de datos**

## Conclusión

En un entorno empresarial cada vez más competitivo, **la velocidad y calidad de las decisiones marcan la diferencia**. Power BI no solo proporciona herramientas de visualización, sino que empodera a toda la organización para trabajar con una visión compartida basada en datos reales.

Como dice el título: hay que *ver para creer*. Y con Power BI, ver y entender los datos se convierte en el primer paso para transformar tu organización.

*¿Tu organización ya está aprovechando el poder de la visualización de datos?*
    `,
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format&q=80',
    author: authors[3], // Diego Fernández - Especialista en Transformación Digital
    category: categories[5], // Transformación Digital
    tags: getTagsByIds(['3', '17', '18', '6']), // KPIs, Indicadores, Análisis de Datos, Automatización
    publishedAt: '2025-01-20T09:00:00Z',
    readingTime: 5,
    featured: true,
    seo: {
      metaTitle: 'Power BI: Transformando Datos en Decisiones Estratégicas',
      metaDescription:
        'Descubre cómo Microsoft Power BI convierte cifras complejas en visualizaciones comprensibles que mejoran la toma de decisiones en tu organización.',
      keywords: [
        'Power BI',
        'visualización de datos',
        'business intelligence',
        'KPIs',
        'toma de decisiones',
        'tableros',
      ],
    },
  },
  {
    id: '3',
    title: 'Primer Encuentro sobre Gobierno Corporativo con la Familia Pérez de Orlando Comercial',
    slug: 'gobierno-corporativo-orlando-comercial',
    excerpt:
      'Un espacio enriquecedor de aprendizaje donde los participantes vivieron de primera mano la importancia de integrar a la familia en los procesos de gobernanza empresarial.',
    content: `
# Primer Encuentro sobre Gobierno Corporativo con la Familia Pérez de Orlando Comercial

El pasado sábado 20 de septiembre tuvimos el honor de acompañar a la Familia Pérez, de Orlando Comercial, en el primer encuentro sobre **Gobierno Corporativo para Empresas Familiares**. Fue un espacio enriquecedor de aprendizaje y reflexión, en el que los participantes vivieron de primera mano la importancia de integrar a la familia en los procesos de gobernanza empresarial.

## Un Espacio de Diálogo y Reflexión

Durante la jornada, se compartieron experiencias y se abrieron espacios de diálogo que permitieron fortalecer la visión común entre los miembros de la familia empresaria. Este tipo de encuentros son fundamentales para:

- **Alinear expectativas** entre los miembros de la familia
- **Fortalecer la comunicación** y el entendimiento mutuo
- **Establecer bases sólidas** para la gobernanza familiar
- **Preparar el terreno** para la implementación de estructuras formales

## Preservando un Legado de Más de 30 Años

Uno de los aspectos más significativos fue reconocer la necesidad de preservar el legado de su fundador **Don Orlando Pérez**, quien por más de 30 años ha estado a la cabeza de la empresa, llegando a ser hoy día **la empresa líder en importación de motocicletas de la República Dominicana**.

Este reconocimiento no solo honra el trabajo del fundador, sino que establece la responsabilidad de las próximas generaciones de mantener y hacer crecer ese legado con la misma pasión y profesionalismo.

## Buenas Prácticas de Gobierno Corporativo en Empresas Familiares

Los participantes pudieron conocer sobre buenas prácticas de gobierno corporativo en empresas familiares, tales como:

### 1. Elaboración de Protocolo de Familia
Un documento fundamental que establece:
- Las reglas de juego para la familia empresaria
- Criterios de entrada y salida de familiares
- Política de dividendos y reinversión
- Mecanismos de resolución de conflictos
- Valores y principios compartidos

### 2. Definición del Órgano Estratégico
Establecimiento de estructuras de gobierno que separen:
- **Consejo de Familia:** Donde se tratan temas familiares
- **Consejo de Administración:** Donde se supervisa la gestión empresarial
- **Gerencia:** Donde se ejecuta la operación diaria

### 3. Profesionalización de la Gestión
Implementación de prácticas que permitan:
- Separar propiedad de gestión cuando sea necesario
- Incorporar talento externo en posiciones clave
- Establecer criterios objetivos de evaluación
- Desarrollar planes de carrera para familiares y no familiares

### 4. Establecimiento de Mecanismos de Transparencia
Desde los órganos de gobierno:
- Reportes financieros periódicos
- KPIs de desempeño claros
- Auditorías externas
- Comunicación formal y estructurada

## Un Compromiso con el Futuro

Este primer encuentro marca el inicio de un proceso de transformación que fortalecerá a Orlando Comercial para las próximas décadas. La disposición de la Familia Pérez, liderada por Don Orlando, demuestra su compromiso no solo con el presente de la empresa, sino principalmente con su futuro.

## Gratitud y Próximos Pasos

Gracias a la Familia Pérez, a la cabeza Don Orlando Pérez, por la confianza en el equipo de DUO Soluciones Empresariales.

Este primer encuentro es solo el comienzo de un camino que incluirá:
- Desarrollo del Protocolo de Familia
- Conformación de los órganos de gobierno
- Implementación de políticas y procedimientos
- Preparación para la sucesión generacional

**Seguimos avanzando juntos hacia una empresa familiar más sólida, profesional y preparada para el futuro.**

*¿Tu empresa familiar ya tiene estructuras de gobierno corporativo establecidas?*
    `,
    coverImage:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop&auto=format&q=80',
    author: authors[2], // Ana Martínez - Consultora de Gobernanza Corporativa
    category: categories[3], // Gobernanza Corporativa
    tags: getTagsByIds(['1', '11', '13', '15']), // Estrategia, Cumplimiento, Gestión del Cambio, PYMES
    publishedAt: '2024-09-20T14:00:00Z',
    readingTime: 5,
    featured: false,
    seo: {
      metaTitle: 'Gobierno Corporativo para Empresas Familiares: Caso Orlando Comercial',
      metaDescription:
        'Conoce cómo Orlando Comercial, líder en importación de motocicletas, inició su proceso de implementación de gobierno corporativo familiar.',
      keywords: [
        'gobierno corporativo',
        'empresas familiares',
        'protocolo de familia',
        'sucesión empresarial',
        'Orlando Comercial',
      ],
    },
  },
  {
    id: '4',
    title: 'Fortaleciendo el Trabajo en Equipo: Jornada con Grabo Estilo',
    slug: 'trabajo-equipo-grabo-estilo',
    excerpt:
      'Una jornada que nos recordó el verdadero valor de trabajar juntos y con un propósito claro. Reforzamos la importancia del trabajo en equipo como la base para alcanzar metas imposibles de lograr individualmente.',
    content: `
# Fortaleciendo el Trabajo en Equipo: Jornada con Grabo Estilo

El pasado 28 de agosto, celebramos junto al equipo gerencial de **Grabo Estilo**, una jornada que nos recordó el verdadero valor de trabajar juntos y con un propósito claro. Esto a través de dinámicas y experiencias compartidas de la mano de **Carol Suárez N.**, reforzamos la importancia del trabajo en equipo como la base para alcanzar metas que, de manera individual, serían imposibles de lograr.

## La Unidad y la Confianza como Pilares

En este encuentro, el equipo gerencial de Grabo Estilo logró ver de primera mano cómo **la unidad y la confianza mutua** se convierten en pilares que:

- Fortalecen las relaciones laborales
- Potencian los resultados organizacionales
- Generan un ambiente de colaboración genuina
- Construyen bases sólidas para el crecimiento

## Más Allá de las Actividades: Reflexión sobre el Legado

Más allá de las actividades, lo que realmente marcó la diferencia fue el **espacio para reflexionar sobre el legado** que queremos construir como organización. Un legado caracterizado por:

### Compromiso
- Con la excelencia en el servicio
- Con el desarrollo de nuestro equipo
- Con la satisfacción del cliente
- Con el crecimiento sostenible

### Colaboración
- Entre departamentos y áreas
- Entre niveles jerárquicos
- Entre ideas y perspectivas diferentes
- Entre experiencia y nueva visión

### Excelencia
- En cada proyecto que emprendemos
- En cada interacción con el cliente
- En cada proceso que ejecutamos
- En cada decisión que tomamos

## El Cliente Como Centro de Todo

Una reflexión fundamental de la jornada fue reafirmar que **el cliente debe estar en el centro de todo lo que hacemos**. Esta orientación no es solo un slogan, sino un principio que debe guiar:

- La toma de decisiones estratégicas
- El diseño de procesos operativos
- La cultura organizacional
- Las prioridades del día a día

## Inicio de un Proceso de Transformación

En esta actividad contamos con la presencia del **Sr. Ignacio Glass** y la **Sra. Sulin Lantigua**. Gracias por confiar en DUO Soluciones Empresariales.

Con este encuentro, **iniciamos un proceso de mejora, aprendizaje y crecimiento sostenible** para la organización que incluirá:

### Optimización de Procesos
Revisión y mejora de los procesos operativos clave para aumentar eficiencia y reducir tiempos de ciclo.

### Implementación de Sistemas ERP
Integración de tecnología que permita una gestión más efectiva de los recursos y mejor toma de decisiones.

### Desarrollo de Gobierno Corporativo
Establecimiento de estructuras de gobernanza que fortalezcan la gestión estratégica de la empresa.

### Análisis con Power BI
Implementación de herramientas de business intelligence para una mejor visualización y análisis de datos.

### Fortalecimiento Organizacional
Desarrollo continuo de las capacidades del equipo y la cultura organizacional.

## El Poder de la Colaboración

Esta jornada nos recordó una verdad fundamental: **los grandes logros son siempre resultado del esfuerzo colectivo**. Ninguna organización exitosa lo es por el trabajo aislado de individuos brillantes, sino por la capacidad de esos individuos de trabajar juntos hacia una visión compartida.

## Próximos Pasos

El encuentro del 28 de agosto marca el inicio de una relación de acompañamiento y crecimiento mutuo. Los próximos meses estarán marcados por:

1. Diagnóstico profundo de procesos actuales
2. Diseño de soluciones personalizadas
3. Implementación gradual de mejoras
4. Capacitación y desarrollo del equipo
5. Seguimiento y ajuste continuo

## Conclusión

Agradecemos a todo el equipo gerencial de Grabo Estilo por su apertura, compromiso y entusiasmo durante esta jornada. Su disposición para trabajar en equipo y su visión clara de construir un legado de excelencia son la base perfecta para el éxito del proceso que iniciamos juntos.

**El futuro de Grabo Estilo se construye hoy, con cada decisión, con cada acción, con cada miembro del equipo comprometido con la excelencia y con el cliente en el centro.**

*¿Tu organización invierte en fortalecer el trabajo en equipo y la cultura organizacional?*
    `,
    coverImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format&q=80',
    author: authors[0], // María González - Directora de Consultoría
    category: categories[0], // Desarrollo Organizacional
    tags: getTagsByIds(['12', '13', '2', '20']), // Cultura Organizacional, Gestión del Cambio, Cambio Organizacional, Transformación
    publishedAt: '2024-08-28T16:00:00Z',
    readingTime: 6,
    featured: false,
    seo: {
      metaTitle: 'Trabajo en Equipo y Desarrollo Organizacional: Caso Grabo Estilo',
      metaDescription:
        'Descubre cómo una jornada de team building marca el inicio de un proceso integral de mejora organizacional en Grabo Estilo.',
      keywords: [
        'trabajo en equipo',
        'desarrollo organizacional',
        'cultura organizacional',
        'liderazgo',
        'mejora continua',
      ],
    },
  },
  {
    id: '5',
    title: 'Iniciamos Proceso de Desarrollo Organizacional con Orlando Comercial',
    slug: 'desarrollo-organizacional-orlando-comercial',
    excerpt:
      'Dimos inicio al proceso de acompañamiento en Desarrollo Organizacional e Implementación de Buenas Prácticas de Gobierno Corporativo junto a Orlando Comercial, empresa líder en el mercado de motocicletas.',
    content: `
# Iniciamos Proceso de Desarrollo Organizacional con Orlando Comercial

El pasado 13 de agosto dimos inicio al proceso de acompañamiento en **Desarrollo Organizacional** e **Implementación de Buenas Prácticas de Gobierno Corporativo** junto a **Orlando Comercial**, empresa líder en el mercado de motocicletas en la República Dominicana.

## Un Paso Estratégico hacia el Futuro

Este importante paso busca **fortalecer la sostenibilidad** y **consolidar las estructuras de gestión corporativa**, garantizando una alineación estratégica y operativa en todos los niveles de la organización.

Este proceso no es solo una mejora incremental, sino una **transformación fundamental** que preparará a Orlando Comercial para:

- Enfrentar los desafíos del mercado con estructuras sólidas
- Escalar el negocio de manera sostenible
- Preparar la transición a futuras generaciones
- Mantener su liderazgo en el sector

## Perspectivas Valiosas en Gestión del Cambio

Contamos con la presencia de nuestro consultor asociado **Emanuel Pérez de EP Ludic Training**, quien aportó valiosas perspectivas en:

### Definición de Enfoques
- Metodologías participativas para el cambio
- Técnicas de facilitación y construcción de consenso
- Herramientas para el diagnóstico organizacional
- Marcos de trabajo para la transformación

### Gestión del Cambio
- Estrategias para reducir la resistencia
- Comunicación efectiva del cambio
- Involucramiento de stakeholders clave
- Monitoreo y ajuste del proceso

## Compromiso del Liderazgo

Asimismo, participó activamente **todo el equipo de primera línea de Orlando Comercial**, encabezado por su presidente el **Sr. Orlando Pérez y sus hijos**, reafirmando el firme compromiso de la organización con:

### Innovación en los Procesos
- Revisión y optimización de procesos operativos
- Implementación de mejores prácticas del sector
- Automatización donde sea posible
- Mejora continua como cultura

### Buenas Prácticas Gerenciales
- Establecimiento de gobierno corporativo robusto
- Definición clara de roles y responsabilidades
- Sistemas de medición de desempeño
- Toma de decisiones basada en datos

### Fortalecimiento de Capacidades Institucionales
- Desarrollo de talento interno
- Transferencia de conocimiento
- Construcción de competencias críticas
- Preparación de futuros líderes

## Alcance del Proceso de Acompañamiento

Por parte de DUO Soluciones Empresariales, participó la **Ing. Angelina Burgos, Directora de Operaciones**, explicando el alcance del proceso de acompañamiento que incluye:

### Fase 1: Diagnóstico Organizacional (Meses 1-2)
- Evaluación de la estructura actual
- Mapeo de procesos críticos
- Identificación de brechas de capacidad
- Análisis de la cultura organizacional
- Assessment de gobierno corporativo

### Fase 2: Diseño de Soluciones (Meses 3-4)
- Rediseño organizacional
- Definición de estructuras de gobierno
- Diseño de procesos optimizados
- Plan de desarrollo de capacidades
- Estrategia de gestión del cambio

### Fase 3: Implementación (Meses 5-10)
- Implementación gradual de cambios
- Capacitación del equipo
- Establecimiento de órganos de gobierno
- Documentación de procesos y políticas
- Ajustes basados en feedback

### Fase 4: Institucionalización (Meses 11-12)
- Consolidación de cambios
- Medición de resultados
- Plan de mejora continua
- Transferencia de conocimiento
- Cierre y evaluación del proceso

## Elementos Clave del Proceso

### Desarrollo Organizacional
- **Estructura organizacional:** Diseño óptimo para la estrategia
- **Procesos:** Eficiencia y efectividad operacional
- **Personas:** Desarrollo de capacidades y talento
- **Cultura:** Valores y comportamientos alineados

### Gobierno Corporativo
- **Consejo de Administración:** Conformación y funcionamiento
- **Protocolo de Familia:** Reglas claras para la familia empresaria
- **Políticas y procedimientos:** Marco de gestión transparente
- **Gestión de riesgos:** Identificación y mitigación proactiva

## Impacto Esperado

Al finalizar este proceso de acompañamiento, Orlando Comercial contará con:

✅ **Estructura organizacional clara y eficiente**
✅ **Órganos de gobierno funcionando efectivamente**
✅ **Procesos optimizados y documentados**
✅ **Equipo capacitado y empoderado**
✅ **Cultura de mejora continua establecida**
✅ **Base sólida para crecimiento sostenible**
✅ **Preparación para sucesión generacional**

## Gratitud y Compromiso

Gracias por permitirnos ser parte de este paso tan importante para el futuro de Orlando Comercial.

Es un privilegio acompañar a una empresa con más de 30 años de historia y liderazgo en el mercado dominicano en este proceso de transformación que asegurará su relevancia y éxito por muchas décadas más.

## Siguiente Etapa

El 20 de septiembre realizaremos el **Primer Encuentro sobre Gobierno Corporativo para Empresas Familiares** con la Familia Pérez, dando continuidad a este proceso integral de desarrollo y fortalecimiento organizacional.

**Estamos comprometidos con el éxito de Orlando Comercial y entusiasmados por el camino que iniciamos juntos.**

*¿Tu organización está preparada para el siguiente nivel de crecimiento?*
    `,
    coverImage:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop&auto=format&q=80',
    author: authors[0], // María González - Directora de Consultoría
    category: categories[0], // Desarrollo Organizacional
    tags: getTagsByIds(['1', '2', '13', '20']), // Estrategia, Cambio Organizacional, Gestión del Cambio, Transformación
    publishedAt: '2024-08-13T10:00:00Z',
    readingTime: 7,
    featured: false,
    seo: {
      metaTitle: 'Desarrollo Organizacional en Orlando Comercial: Caso de Éxito',
      metaDescription:
        'Conoce cómo Orlando Comercial, líder en motocicletas, inició su proceso de desarrollo organizacional y gobierno corporativo con DUO Soluciones.',
      keywords: [
        'desarrollo organizacional',
        'gobierno corporativo',
        'gestión del cambio',
        'empresa familiar',
        'Orlando Comercial',
      ],
    },
  },
]

// Helper functions
export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
}

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.category.slug === categorySlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getBlogPostsByTag = (tagSlug: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.tags.some(tag => tag.slug === tagSlug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getBlogPostsByAuthor = (authorId: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.author.id === authorId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getRelatedBlogPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
  // Get posts with same category or tags
  const related = blogPosts
    .filter(p => p.id !== post.id)
    .filter(
      p =>
        p.category.id === post.category.id ||
        p.tags.some(tag => post.tags.some(t => t.id === tag.id))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return related.slice(0, limit)
}
